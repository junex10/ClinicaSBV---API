import { Module } from '@nestjs/common';

import { AssociatesModule } from './associates/associates.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        AssociatesModule,
        AppointmentsModule,
        ChatModule
    ],
    providers: []
})
export class PatientModule {}
