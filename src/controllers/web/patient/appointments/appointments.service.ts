import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {
    User,
    Specializations,
    AppointmentsControl
} from "src/models";
import { Constants, Globals } from 'src/utils';
import {
    
} from './appointments.entity';
import * as fs from 'fs';
import * as moment from 'moment';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Specializations) private specializationModel: typeof Specializations,
        @InjectModel(AppointmentsControl) private appointmentsControlModel: typeof AppointmentsControl,
    ) {

    }

    getSpecializations = () => this.specializationModel.findAll({ attributes: ['id', 'code', 'name'] });

    getDoctor = (specialization_id: number) => 
        this.appointmentsControlModel.findAll({ where: { specialization_id }, include: [{ model: User }] });
}
