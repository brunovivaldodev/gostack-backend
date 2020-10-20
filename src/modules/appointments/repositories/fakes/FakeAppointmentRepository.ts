import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
    private appointments: Appointment[] = [];

    public async create({
        date,
        provider_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;

        this.appointments.push(appointment);

        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appoitment =>
            isEqual(appoitment.date, date),
        );
        return findAppointment;
    }
}

export default AppointmentsRepository;
