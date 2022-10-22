import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import {

} from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([

    ])
  ],
  providers: [
    SystemService
  ],
  controllers: [SystemController]
})
export class SystemModule { }
