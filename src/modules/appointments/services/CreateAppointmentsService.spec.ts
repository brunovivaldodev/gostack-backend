import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '3322',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('3322');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '3322',
        });
        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '3322',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
