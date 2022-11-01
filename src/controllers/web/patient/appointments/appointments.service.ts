import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {
    User,
    Specializations,
    AppointmentsControl,
    MedicalAppointments
} from "src/models";
import { Constants, Globals } from 'src/utils';
import {
    
} from './appointments.entity';
import * as fs from 'fs';
import * as moment from 'moment';
import { Op, Sequelize } from 'sequelize';

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
    private DAYS_BD = [
        { day: 'lunes', value: Constants.DAYS_BD.MONDAY },
        { day: 'martes', value: Constants.DAYS_BD.TUESDAY },
        { day: 'miercoles', value: Constants.DAYS_BD.WEDNESDAY },
        { day: 'jueves', value: Constants.DAYS_BD.THURSDAY },
        { day: 'viernes', value: Constants.DAYS_BD.FRIDAY },
        { day: 'sabado', value: Constants.DAYS_BD.SATURDAY },
        { day: 'domingo', value: Constants.DAYS_BD.SUNDAY }
    ];

    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Specializations) private specializationModel: typeof Specializations,
        @InjectModel(AppointmentsControl) private appointmentsControlModel: typeof AppointmentsControl,
        @InjectModel(MedicalAppointments) private medicalAppointmentModel: typeof MedicalAppointments,
    ) {

    }

    getSpecializations = () => this.specializationModel.findAll({ attributes: ['id', 'code', 'name'] });

    getDoctor = (specialization_id: number) => 
        this.appointmentsControlModel.findAll({ where: { specialization_id }, include: [{ model: User }] });

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
        let weeks = this.DAYS_BD.map(item => ( item.value ));
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

    private formatDay = (day: string) => {
        return this.DAYS.find(val => val.day === day);
    }
}
