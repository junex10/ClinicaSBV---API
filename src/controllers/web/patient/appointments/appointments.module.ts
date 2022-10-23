import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { User, Specializations, AppointmentsControl } from 'src/models';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            Specializations,
            AppointmentsControl
        ])
    ],
    controllers: [
        AppointmentsController
    ],
    providers: [
        AppointmentsService
    ]
})
export class AppointmentsModule { }
