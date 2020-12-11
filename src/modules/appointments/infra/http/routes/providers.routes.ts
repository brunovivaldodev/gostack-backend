import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ProvidersControllers from '../controllers/ProvidersControllers';
import ProviderMonthAvialability from '../controllers/ProviderMonthAvialabilityController';
import ProviderDayAvialability from '../controllers/ProviderDayAvialabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticate);
const providersControllers = new ProvidersControllers();
const providerMonthAvialability = new ProviderMonthAvialability();
const providerDayAvialability = new ProviderDayAvialability();

providersRouter.get('/', providersControllers.index);
providersRouter.get(
    '/:provider_id/month-avialability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    providerMonthAvialability.index,
);
providersRouter.get(
    '/:provider_id/day-avialability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    providerDayAvialability.index,
);

export default providersRouter;
