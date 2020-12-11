import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
    provider_id: string;
    month: number;
    day: number;
    year: number;
}

@injectable()
class ListProvidersAppointmentsService {
    constructor(
        @inject('AppointmentRepository')
        private appointmentRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        day,
        month,
    }: IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentRepository.findAllInDayFromProvider(
            {
                provider_id,
                year,
                day,
                month,
            },
        );

        return appointments;
    }
}
export default ListProvidersAppointmentsService;
