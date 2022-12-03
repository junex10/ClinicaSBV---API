import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {
    User,
    Specializations,
    AppointmentsControl,
    MedicalAppointments,
    Payments,
    CompanyInformation
} from "src/models";
import { Constants, Globals, CreateExcel } from 'src/utils';
import { 
    RegisterAppointmentDTO,
    GetAppointmentsDTO
} from './appointments.entity';
import * as fs from 'fs';
import * as moment from 'moment';
import { Op, Sequelize } from 'sequelize';
import { PDFService } from 'src/vendor/nestjs-pdf';

@Injectable()
export class AppointmentsService {

    private DAYS = [
        { day: 'lunes', value: Constants.DAYS.MONDAY },
        { day: 'martes', value: Constants.DAYS.TUESDAY },
        { day: 'miercoles', value: Constants.DAYS.WEDNESDAY },
        { day: 'jueves', value: Constants.DAYS.THURSDAY },
        { day: 'viernes', value: Constants.DAYS.FRIDAY },
        { day: 'sabado', value: Constants.DAYS.SATURDAY },
        { day: 'domingo', value: Constants.DAYS.SUNDAY }
    ];

    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Specializations) private specializationModel: typeof Specializations,
        @InjectModel(AppointmentsControl) private appointmentsControlModel: typeof AppointmentsControl,
        @InjectModel(MedicalAppointments) private medicalAppointmentModel: typeof MedicalAppointments,
        @InjectModel(CompanyInformation) private companyInformationModel: typeof CompanyInformation,
        private readonly pdfService: PDFService
    ) {

    }

    appointments = async (request: GetAppointmentsDTO) => {
        const options = {
            ALL: 1,
            ASSOCIATES: 2,
            SELF: 3
        };
        let users: any;
        switch(request.filterType) {
            case options.ASSOCIATES:
                users = await this.userModel.findAll({
                    where: {
                        associated_id: request.user_id 
                    }
                });
            break;
            case options.SELF:
                users = await this.userModel.findAll({
                    where: {
                        id: request.user_id 
                    }
                });
            break;
            default:
                users = await this.userModel.findAll({
                    where: {
                        [Op.or]: [{ id: request.user_id }, { associated_id: request.user_id }]
                    }
                });
            break;
        }

        const users_id = users.map(item => (item.id));
        
        const medicalAppointment = await this.medicalAppointmentModel.findAndCountAll({
            distinct: true,
            col: 'id',
            limit: request.per_page || Constants.PER_PAGE_WEB,
            offset: ((request.page || 1) - 1) * (request.per_page || Constants.PER_PAGE_WEB),
            order: [['id', 'desc']],
            where: {
                patient_id: {
                    [Op.in]: users_id
                }
            },
            include: [
                { association: 'patient' },
                { model: Payments },
                { model: Specializations },
                { association: 'doctor' }
            ]
        });
        const data: unknown = medicalAppointment.rows.map(item => {
            return {
                id: item.id,
                name: item.patient.person?.name,
                lastname: item.patient.person?.lastname,
                medical_reason: item.medical_reason,
                medical_description: item.medical_description,
                amount: item.amount,
                status: this.defineStatus(item.status)?.TEXT ?? 'Desconocido',
                date_cite: moment(item.date_cite).format('DD/MM/YYYY'),
                entry_date: moment(item.entry_date).format('DD/MM/YYYY h:mm a'),
            }
        });
        const count: number = medicalAppointment.count as number;
        const rows: unknown[] = data as unknown[];
        return {
            count,
            rows
        };
    }

    getSpecializations = () => this.specializationModel.findAll({ attributes: ['id', 'code', 'name'] });

    getDoctor = (specialization_id: number) => 
        this.appointmentsControlModel.findAll({ where: { specialization_id }, include: [{ model: User }], group: ['doctor_id'] });

    getDoctorAppointments = async (doctor_id: number, specialization_id: number) => {
        const control = await this.appointmentsControlModel.findAll({ where: { doctor_id, specialization_id } });
        const days = control.map(item => ({ ...this.formatDay(item.day) }));
        let daysToHide = [];
       
        const appointments = await this.medicalAppointmentModel.findAll({
            where: {
                doctor_id,
                specialization_id,
                status: Constants.MEDICAL_APPOINTMENTS.STATUS.PENDING_CONFIRM
            }
        });

        let catchHours = {};

        for (let item = 0; item < appointments.length; item++) {
            const dayOfWeek = moment(appointments[item].date_cite).isoWeekday();
            const date = moment(appointments[item].date_cite).format('YYYY-MM-DD');
            if (dayOfWeek === days[0].value) {
                catchHours[date] = {
                    ...catchHours[date],
                    [appointments[item].id]: date
                }
            }
        }
        Object.values(catchHours).forEach(item => {
           const getDay = Object.values(item);
           const days = control.map(value => getDay.length >= value.quotes_available && (getDay[0]) );
           if (days[0] !== false) daysToHide.push(days[0]);
        });
        const daysToShow = days.map(item => ( item.value ));
        let weeks = this.DAYS.map(item => ( item.value ));
        for (let x = 0; x < weeks.length; x++) {
            for (let y = 0; y < daysToShow.length; y++) {
                if (weeks[x] === daysToShow[y]) {
                    weeks.splice(x, 1);
                }
            }
        }
        return {
            days: daysToHide,
            weeks
        };
    }

    register = async (request: RegisterAppointmentDTO) => {
        const control = await this.appointmentsControlModel.findOne({ where: { doctor_id: request.doctor, specialization_id: request.specialization } })
        const register = await this.medicalAppointmentModel.create({
            patient_id: request.patient,
            doctor_id: request.doctor,
            specialization_id: request.specialization,
            medical_reason: request.medical_reason,
            medical_description: request.medical_description,
            date_cite: request.date_cite,
            status: Constants.MEDICAL_APPOINTMENTS.STATUS.PENDING_CONFIRM,
            amount: control.amount
        });
        if (register !== null) {
            return register;
        }
        return false;
    }

    getPDF = async (request: GetAppointmentsDTO) => {
        const user = await this.userModel.findOne({ where: { id: request.user_id } });
        const data = await this.appointments(request);

        const company_information = (await this.companyInformationModel.findAll())[0];

        const file = await this.pdfService.toBuffer('patient_appointments-list', {
            locals: {
                company_name: company_information.name,
                company_email: company_information.email,
                company_phone: company_information.phone,
                company_rif: company_information.document,
                company_address: company_information.address,
                data: data.rows
            }
        }).toPromise();

        const name = `pdf/ListadoCitas_${user.person?.name}_${user.person?.lastname}.pdf`;
        fs.writeFileSync('public/storage/' + name, file);
        return name;
    }

    getExcel = async (request: GetAppointmentsDTO) => {
        const user = await this.userModel.findOne({ where: { id: request.user_id } });
        const appointments = await this.appointments(request);
        const company_information = (await this.companyInformationModel.findAll())[0];

        const data = appointments.rows.map((item: any) => ({
            ['Nombre(s)']: item.name,
            ['Apellido(s)']: item.lastname,
            ['Razó de la cita']: item.medical_reason,
            ['Descripción']: item.medical_description,
            ['Monto']: item.amount,
            ['Estatus']: item.status,
            ['Fecha de la cita']: item.date_cite,
            ['Fecha de entrada(s)']: item.entry_date,
        }));

        const excel = await CreateExcel(
            `ListadoCitas_${user.person?.name}_${user.person?.lastname}`,
            `Listado de Citas - ${user.person?.name} ${user.person?.lastname}`,
            data,
            'none'
        );
        return excel;
    }

    private formatDay = (day: string) => {
        return this.DAYS.find(val => val.day === day);
    }
    private defineStatus = (status: number) => 
        Object.values(Constants.MEDICAL_APPOINTMENTS.STATUS).find(item => status === item.CODE);

}
