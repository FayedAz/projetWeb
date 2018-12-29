import { MinLength, MaxLength, IsString, IsMongoId, IsNumberString, IsNumber} from "class-validator";
import { Expose } from "class-transformer";
import { Double } from "bson";
import { isBoolean } from "util";

/**
 * Classe décrivant la structure des données nécessaires
 * à l'ajout d'un nouvel article.
 */
export class ArticleData {


  /**
   * Nom de l'article
   */
  @Expose()
  @IsString()
  @MaxLength(20, {message : "Article's name is too long"})
  name: string;

  /**
   * Quantité de l'article
   */
  @Expose()
  @IsNumberString()
  quantity: Double;

  /**
   * Mesure de la quantité à acheter
   */
  @Expose()
  @IsString()
  @MaxLength(3, {message : "Measure is too big"})
  measure: string;
  /**
   * Vrai si l'article est acheté
   */
  @Expose()
  bought: boolean;


  constructor() {
    this.name = '';
    this.quantity = 0;
    this.measure = '';
    this.bought = false;
  }

}