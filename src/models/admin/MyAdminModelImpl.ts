import { MyAdminModel } from "./MyAdminModel";
import { Db, ObjectID } from "mongodb";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ArticleData } from './ArticleData';
import { MyAsyncModel } from '../MyAsyncModel'
import { DeleteArticleData } from "./DeleteArticleData";


export class MyAdminModelImpl implements MyAdminModel {
    private db : Db;
    private model : MyAsyncModel;
    
    /**
     * Construit un modèle asynchrone.
     * 
     * @param db Base de données.
     * @param model Modèle asynchrone.
     */
    constructor(db : Db, model : MyAsyncModel) {
        this.db = db;
        this.model = model;
    }

    /**
    * @see MyAdminModel#addArticle
    */
    async addArticle(userId: any, data : any) : Promise<any> {
        const articleData : ArticleData = plainToClass<ArticleData, object>(ArticleData, data, {strategy : 'excludeAll' });
        await this.validate(articleData);

        if(articleData.quantity <= 0){
            throw new Error("Quantity must be superior to 0");
        }

        const result = await this.db.collection('lists').insertOne({
            user: userId,
            name: articleData.name,
            quantity: articleData.quantity,
            measure: articleData.measure,
            bought: false
        })
        return result.insertedId;
    }

    /**
     * 
     * Lève une exception si l'objet passé en paramètre n'a pas pu être validé.
     * 
     * @param object Objet à valider
     */
    private async validate(object : any) : Promise<void> {
        const errors = await validate(object);
        if (errors.length == 0) return;
        throw errors;
    }

    /**
    * @see MyAdminModel#archiveArticle
    */
    async archiveArticle(data : any): Promise<void>{
        const archiveArticleData : DeleteArticleData = plainToClass<DeleteArticleData, object>(DeleteArticleData, data, {strategy : 'excludeAll' });
        await this.validate(archiveArticleData);
        await this.db.collection('lists').updateOne({ _id : new ObjectID(archiveArticleData._id)}, {$set:{bought: true}});
    }

    /**
    * @see MyAdminModel#cancelBoughtArticle
    */
    async cancelBoughtArticle(data : any): Promise<void>{
        const cancelBoughtArticle : DeleteArticleData = plainToClass<DeleteArticleData, object>(DeleteArticleData, data, {strategy : 'excludeAll' });
        await this.validate(cancelBoughtArticle);
        await this.db.collection('lists').updateOne({ _id : new ObjectID(cancelBoughtArticle._id)}, {$set:{bought: false}});
    }

    /**
    * @see MyAdminModel#deleteArticle
    */
    async deleteArticle(data : any): Promise<void>{
        const deleteArticle : DeleteArticleData = plainToClass<DeleteArticleData, object>(DeleteArticleData, data, {strategy : 'excludeAll' });
        await this.validate(deleteArticle);
        await this.db.collection('lists').deleteOne({ _id : new ObjectID(deleteArticle._id)});
    }

}