import { Module } from '@nestjs/common';

import { AssociatesModule } from './associates/associates.module';

@Module({
    imports: [
        AssociatesModule
    ],
    providers: []
})
export class PatientModule {}
