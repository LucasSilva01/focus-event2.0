const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const router = express.Router(); 
const authConfig = require('../../config/auth');


router.post('/register', async(req, res) => {
    const { email } = req.body;
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists.'});

        const user = await User.create(req.body);
        
        user.password = undefined;

        return res.send({ user, 
            token: generateToken({ id: user.id })  });
    } catch (err) {
        return res.status(400).send({ error: 'Resgistration failed.'});
    }
});

function generateToken(params = {}){
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/authenticate', async (req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email, password })
    if(!user){
        return res.status(400).send({ error: 'User not found'});
    }
    //if(!await bcrypt.compare(password, user.password)){
      //  return res.status(400).send({ error: 'Invalid password'});
    //}
    user.password = undefined;

    
    res.send({ user, token: generateToken({ id: user.id }) });
})


module.exports = (app) => app.use('/auth', router);


