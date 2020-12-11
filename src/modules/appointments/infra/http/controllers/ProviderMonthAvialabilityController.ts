import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderMonthAvialabilityService from '@modules/appointments/services/ListProvidersMonthAvialabilityService';

export default class ProviderMonthAvialabilityControllers {
    public async index(req: Request, res: Response): Promise<Response> {
        const { month, year } = req.body;
        const { provider_id } = req.params;
        const listProvidersMonthAvialability = container.resolve(
            ProviderMonthAvialabilityService,
        );

        const availability = await listProvidersMonthAvialability.execute({
            month,
            provider_id,
            year,
        });
        return res.json(availability);
    }
}
