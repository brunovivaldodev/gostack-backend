import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';

interface Request {
    date: Date;
    provider_id: string;
    user_id: string;
}
@injectable()
class createAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointment on a past date",
            );
        }
        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself");
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) < 17) {
            throw new AppError(
                'You can only create appointments between 8am and 5pm ',
            );
        }
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is alredy booked');
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id,
        });

        const dateFormated = format(
            appointmentDate,
            "dd/MM/yyyy 'ás' HH:m 'h'",
        );
        await this.notificationsRepository.create({
            content: `Novo agendamento para ${dateFormated}`,
            recipient_id: provider_id,
        });
        return appointment;
    }
}

export default createAppointmentService;
