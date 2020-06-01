import Notification from '../schemas/Notification';

import User from '../models/User';

class NotificationController {
    async index(req,res){
        //Check is a Provider 
        const checkIsProvider = await User.findOne({
            where: {id: req.userId, provider: true}
        })
        if(!checkIsProvider){
            return res.status(401).json({ error: 'Only provider can load notification'})
        }

        //List Notifications
        const notifications = await Notification.find({
            user: req.userId,
        }).sort({createdAt: 'desc'}).limit(20)
        //sort = ordenar por data de criação 

        return res.json(notifications);
    }

    async update (req,res){

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {read: true},
            {new: true} //vai no banco e retorna o resultado
        );
        
        return res.json(notification)

    }
}

export default new NotificationController();