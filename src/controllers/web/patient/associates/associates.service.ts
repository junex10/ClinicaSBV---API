import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Person, User, Petition } from "src/models";
import { Constants, Globals } from 'src/utils';
import {
    CreateAssociatedDTO
} from './associates.entity';
import * as fs from 'fs';
import * as moment from 'moment';

@Injectable()
export class AssociatesService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Person) private personModel: typeof Person,
        @InjectModel(Petition) private petitionModel: typeof Petition,
    ) {

    }

    new_associated = async (request: CreateAssociatedDTO, file: Express.Multer.File) => {
        const user = await this.userModel.findOne({ where: { id: request.associated_id } });
        if (file !== undefined && user?.photo !== null) {
            const PATH = `./public/storage/${user?.photo}`;
            if (fs.existsSync(PATH)) fs.unlinkSync(PATH);
        }
        const age = Globals.calculateAge(request.birthdate);

        const create = await this.userModel.create(
            {
                email: request.email,
                photo: file !== undefined ? ('users/' + file.filename) : user?.photo,
                level_id: Constants.LEVELS.PATIENT,
                associated_id: request.associated_id,
                verified: Constants.USER.USER_VERIFIED.VERIFIED
            }
        );
        if (create !== null) {
            this.personModel.create(
                {
                    name: request.name,
                    lastname: request.lastname,
                    phone: request.phone,
                    address: request.address,
                    age,
                    medical_history: 0,
                    birthdate: request.birthdate !== null ? moment(request.birthdate).toDate() : '',
                    user_id: create.id
                }
            );
            this.petitionModel.create(
                {
                    user_id: request.associated_id,
                    process_id: Constants.PETITIONS.ADD_ASSOCIATED
                }
            )
            return await this.userModel.findOne(
                { 
                    include: ['person'],
                    where: { id: create.id } 
                }
            );
        }

        return null;
    }

    getll = async (user_id: number, page?: number) => {
        const users = await this.userModel.findAndCountAll({
			distinct: true,
            col: 'id',
            limit: Constants.PER_PAGE_WEB,
            offset: ((page || Constants.PER_PAGE_WEB) - 1) * (Constants.PER_PAGE_WEB),
            order: [['id', 'desc']],
            attributes: { exclude: ['updated_at', 'deleted_at'] },
            include: ['person'],
            where: {
                associated_id: user_id
            }
		});
        return users;
    }
}
