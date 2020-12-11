import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsControllers {
    public async index(req: Request, res: Response): Promise<Response> {
        const { day, month, year } = req.body;
        const provider_id = req.user.id;

        const listProvidersAppointment = container.resolve(
            ListProvidersAppointmentService,
        );

        const appointments = await listProvidersAppointment.execute({
            provider_id,
            day,
            month,
            year,
        });
        return res.json(appointments);
    }
}
