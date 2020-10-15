import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import '@shared/infra/typeorm';
import '@shared/Container';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files/', express.static(uploadConfig.directory));
app.use(routes);

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server Is Running at port 3333🚀');
});
