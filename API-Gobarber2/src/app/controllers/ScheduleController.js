import { startOfDay, endOfDay, parseISO, startOfHour} from 'date-fns';
import { Op } from 'sequelize' //Comando para usar operadores do sequelize

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController{
    async index(req, res){

        //verificar se o usuário é provider
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true},
        });
        if(!(checkUserProvider)){
            return res.status(401).json({ error: 'User is not a provider' })
        }

        const { date } = req.query;
        const parsedDate = parseISO(date); //Convertendo o date para um valor de data, para manipular

        //Buscando os agendamentos para essa data 
        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    //Fazer uma verificação no banco em between, está entre ....
                    [Op.between]: [ // A data está entre o inicio do dia ao final
                        startOfHour(parsedDate),
                        endOfDay(parsedDate)
                    ]
                },
            },
            order: ['date'],//ordenando o retorno por data
        })




        return res.json(appointments);
    }
}

export default new ScheduleController();