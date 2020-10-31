import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICacheProvider from './providers/CacheProviders/models/ICacheProvider';

import RedisCacheProvider from './providers/CacheProviders/implementations/RedisCacheProvider';

container.registerSingleton<IAppoitmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);
container.registerSingleton<IAppoitmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);
container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    RedisCacheProvider,
);
