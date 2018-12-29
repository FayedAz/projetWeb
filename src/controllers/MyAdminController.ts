import { Router, Request, Response, NextFunction } from 'express';
import { MyAdminModel } from "../models/admin/MyAdminModel";
import * as dateFormat from 'dateformat';
import { AuthController } from './AuthController';
import { MyAsyncModel } from '../models/MyAsyncModel';
import { MyAsyncModelImpl } from '../models/MyAsyncModelImpl';
import { Db } from 'mongodb';


export class MyAdminController {
    private adminModel : MyAdminModel;
    private model : MyAsyncModel;
    private db : Db;

    constructor(adminModel : MyAdminModel, model: MyAsyncModel, db : Db) {
        this.adminModel = adminModel;
        this.model = model;
        this.db = db;
    }


/* .... */

    router(authController : AuthController) : Router {
        const router = Router();
        router.use(authController.redirectUnloggedUser.bind(authController));
        router.get('/', this.getAccountPanel.bind(this));
        router.get('/index', this.getIndex.bind(this))
        router.post('/article', this.postArticle.bind(this));
        router.post('/archiveArticle', this.archiveArticle.bind(this));
        router.post('/cancelBoughtArticle', this.cancelBoughtArticle.bind(this));
        router.post('/deleteArticle', this.deleteArticle.bind(this));
        return router;
    }

    private async getIndex(request: Request, response: Response, next : NextFunction): Promise<void> {      
        try {
            response.render('render');
        } catch (errors) {
            await this.renderAccountPanel(request, response, request.body, errors);
        }
        
    }

    private async getAccountPanel(request: Request, response: Response, next : NextFunction): Promise<void> {      
        await this.renderAccountPanel(request, response, {}, undefined);
    }

    private async postArticle(request: Request, response: Response, next : NextFunction): Promise<void> {
        try {
            await this.adminModel.addArticle(response.locals.loggedUser._id, request.body);
            response.redirect(request.baseUrl);
        } catch (errors) {
            await this.renderAccountPanel(request, response, request.body, errors);
        }
    } 

    private async archiveArticle(request: Request, response: Response, next : NextFunction): Promise<void> {
        try {
            await this.adminModel.archiveArticle(request.body);
            response.redirect(request.baseUrl);
        } catch (errors) {
            await this.renderAccountPanel(request, response, {}, errors);
        }
    } 

    private async cancelBoughtArticle(request: Request, response: Response, next : NextFunction): Promise<void> {
        try {
            await this.adminModel.cancelBoughtArticle(request.body);
            response.redirect(request.baseUrl);
        } catch (errors) {
            await this.renderAccountPanel(request, response, {}, errors);
        }
    } 

    private async deleteArticle(request: Request, response: Response, next : NextFunction): Promise<void> {
        try {
            await this.adminModel.deleteArticle(request.body);
            response.redirect(request.baseUrl);
        } catch (errors) {
            await this.renderAccountPanel(request, response, {}, errors);
        }
    } 

    private async renderAccountPanel(request : Request, response: Response, articleData : any, errors : any) : Promise<void> {
        const articles = await this.model.articles(response.locals.loggedUser._id);
        const list = new MyAsyncModelImpl(this.db);
        const table = await list.articles(response.locals.loggedUser._id);
        response.render('accountPanel', {
            csrf : request.csrfToken(),
            articles : articles, 
            dateFormat: dateFormat, 
            articleData : articleData,
            errors : errors,
            table : table
        });
    }

}