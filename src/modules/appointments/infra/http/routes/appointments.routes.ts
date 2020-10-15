import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentsControllers from '../controllers/AppointmentsControllers';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticate);
const appointmentsControllers = new AppointmentsControllers();
// appointmentsRouter.get('/', async (req, res) => {
//     console.log(req.user);

//     const appointments = await appointmentsRepository.find();
//     return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsControllers.create);

export default appointmentsRouter;
