import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderDayAvialabilityService from '@modules/appointments/services/ListProviderDayAviabilityService';

export default class ProviderMonthAvialabilityControllers {
    public async index(req: Request, res: Response): Promise<Response> {
        const { month, year, day } = req.body;
        const { provider_id } = req.params;
        const listProvidersDayAvialability = container.resolve(
            ProviderDayAvialabilityService,
        );

        const availability = await listProvidersDayAvialability.execute({
            month,
            day,
            provider_id,
            year,
        });
        return res.json(availability);
    }
}
