import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { AssociatesService } from './associates.service';
import { AssociatesController } from './associates.controller';
import { Person, Petition, User } from 'src/models';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            Person,
            Petition
        ])
    ],
    controllers: [
        AssociatesController
    ],
    providers: [
        AssociatesService
    ]
})
export class AssociatesModule { }
