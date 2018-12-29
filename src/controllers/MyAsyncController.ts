import { Request, Response, NextFunction, Router } from 'express';
import { MyAsyncModelImpl } from '../models/MyAsyncModelImpl';
import { Db, ObjectId } from 'mongodb';

export class MyAsyncController {
    private db : Db;

    constructor(db: Db) {
        this.db = db;
    }

    router() {
        const router = Router();
        router.get('/', this.getIndex.bind(this));
        return router;
    }

    private async getIndex(request: Request, response: Response, next : NextFunction): Promise<void> {
        try {
            const list = new MyAsyncModelImpl(this.db);
            response.render('index');
            } catch (exception) {
            next(exception);
        }
    }

}