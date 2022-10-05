import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Petition } from "src/models";
import { Constants, Hash, Globals } from 'src/utils';
import { PetitionsDTO } from './petition.entity';

@Injectable()
export class PetitionService {

	constructor(
		@InjectModel(Petition) private petitionModel: typeof Petition
	) {}
	
	getPetitions = async (petition: PetitionsDTO) => {
		const petitions = await this.petitionModel.findAndCountAll({
			distinct: true,
            col: 'Petition.id',
            limit: Constants.PER_PAGE_WEB,
            offset: ((petition.page || 1) - 1) * (Constants.PER_PAGE_WEB),
            order: [['id', 'desc']],
            attributes: { exclude: ['updated_at', 'deleted_at'] }
		});
		if (petitions.rows.length > 0) {
            let data = {
                petitions: [],
                count: petitions.count
            };
            petitions?.rows.map((value) => {
                data.petitions.push({
                    id: value.id,
                    process: value.process.description,
                    date: value.created_at
                });
            });
            return data;
        }
        else return null;
	}
}
