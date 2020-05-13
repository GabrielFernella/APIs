const Note = require('../models/Notes');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk({
      where: {id: user_id}
    });

    if(!user){
      return res.status(400).json({error: 'User not found'})
    }

    const notes = await Note.findAll({ 
      where: { user_id: user.get }
    });

    return res.json(notes);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { title, text } = req.body;

    const user = await User.findByPk(user_id);
    if(!user){
      return res.status(400).json({error: 'User not found'})
    }

    const notes = await Note.create({ 
      user_id,
      title, 
      text,
    });

    return res.json(notes);
  }
};