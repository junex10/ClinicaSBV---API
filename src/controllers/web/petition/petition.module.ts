import { Module } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { PetitionController } from './petition.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Petition } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Petition
    ])
  ],
  controllers: [
    PetitionController
  ],
  providers: [
    PetitionService
  ]
})
export class PetitionModule {}
