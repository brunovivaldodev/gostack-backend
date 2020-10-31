import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentsControllers from '../controllers/AppointmentsControllers';
import ProviderAppointmentsControllers from '../controllers/ProviderAppointmentsControllers';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticate);
const appointmentsControllers = new AppointmentsControllers();
const providerAppointmentsControllers = new ProviderAppointmentsControllers();

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsControllers.create,
);
appointmentsRouter.get('/me', providerAppointmentsControllers.index);
export default appointmentsRouter;
