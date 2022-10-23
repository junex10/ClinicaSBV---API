import { Module } from '@nestjs/common';

import { AssociatesModule } from './associates/associates.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
    imports: [
        AssociatesModule,
        AppointmentsModule
    ],
    providers: []
})
export class PatientModule {}
