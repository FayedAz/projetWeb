import { IsMongoId, IsISO8601, IsNumberString} from "class-validator";
import { Expose } from "class-transformer";

/**
 * Classe décrivant la structure des données nécessaires
 * à la suppression d'un article
 */
export class DeleteArticleData {

  @Expose()
  _id: any;

  constructor() {
      this._id ='';
  }

}