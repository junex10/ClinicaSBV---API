import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';

@Module({
    imports: [
        SystemModule
    ],
    providers: []
})
export class AdminModule { }
