import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

import {startOfHour,parseISO, isBefore, format, subHours} from 'date-fns';
//subhous - Busca valores anteriores ao horário previsto
//parseISO - Converte uma string em data para manipulação
//startOfHour - Começa apartir do inicio da hora referenciada
import pt from 'date-fns/locale/pt'; //para traduzir o mes
import * as Yup from 'yup';

import Notification from '../schemas/Notification';

class AppointmentController {

    async index(req, res) {
        const { page = 1 } = req.query;



        //List appointments do user, userId é o paremetro do middleware de autenticação
        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null},
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20, //limirtar a 20 registros por página
            offset: (page - 1) * 20, //quantos registros eu quero pular *** para ele pular em 20 em 20
            include: [ //incluindo os dados do provider
                {
                    model: User,
                    as: 'provider', //Precisa especificar qual é o campo que esta sendo referenciado
                    attributes: ['id', 'name'],
                    include: [
                    {
                        model: File,
                        as: 'avatar',
                        attributes: ['id','path','url']
                    }
                    ]
                }
            ]
        })

        return res.send(appointments);
    }


    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        }) 
        //Checar se o schema do yup do req.body está válido para continuar
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'})
        }
        //pegando os valores dos paremstros da requisição
        const { provider_id, date } = req.body;

        //check provider_id is a provider
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true}
        })
        if(!isProvider){
            return res.status(401).json({ error: 'You can only create appointments with providers'})
        }

        //check for past dates
        //Passando a data que está sendo convertida pelo parseISO para o padrão de date & startOfHour para pegar o valor da Hora
        const hourStart = startOfHour(parseISO(date)); 
        
        if(isBefore(hourStart, new Date())){
            return res.status(400).json({error: 'Past date are not permitted'})
        }

        //check date availability - Ver se tem disponibilidade em determianda data e hora
        const checkAvailability = await Appointment.findOne({
            where: {
                //procurar por
                provider_id,
                canceled_at: null,
                date: hourStart,
            }
        })
        if(checkAvailability){
            return res.status(400).json({error: 'appointment date is not available'})
        }

        //Create appointment
        const appointment = await Appointment.create({
            user_id: req.userId, //Usuário atribuido peli middleware de autenticação
            provider_id,
            date: hourStart, //pegara o inicio da hora que está sendo agendado
        })

        //Notify Provider with mongoDB--------------------------------------
        const user = await User.findByPk(req.userId);
        const formattedDate = format(hourStart, 
            " 'dia' dd 'de' MMMM', às'  H:mm'h'",
            { locale: pt}
            ); //Formatando a data

        //Create notification
        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formattedDate}`,
            user: provider_id,
        })

        return res.json(appointment);
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id)

        //Verificando se o usuário que está cancelando não é o mesmo que está solicitando o cancelamento
        if (appointment.user_id != req.userId){
            return res.status(401).json({ error: "Tou don't permission to cancel this appointment"})
        }

        //manipulando horas para ter um limite de hora para o cancelamento
        const dateWithSub = subHours(appointment.date, 2);

        if(isBefore(dateWithSub, new Date() )) {
            return res.status(401).json({error: 'You can only cancel appointment 2 hours in advance'})
        }

        appointment.canceled_at = new Date();
        await appointment.save();

        return res.json(appointment);
    }

}

export default new AppointmentController();

//Aula 15