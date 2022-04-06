const express = require('express');
const router = express.Router();
const User = require('../model/userMd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const env = require("../config/config");

//UTIL
const createToken = (userId) => {
    return jwt.sign({ id: userId }, env.jwtSenha, { expiresIn: "10M" });
}

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err) return res.status(500).send({ error: err });
        return res.send(data);
    });
});


router.post('/create', async (req, res) => {
    const { email, password, cpf} = req.body;

    if (!email || !password || !cpf) return res.status(400).send({ error: 'Preencha os campos obrigatorios !' });

    try {
        if (await User.findOne({ cpf })) return res.status(400).send({ error: "CPF ja cadastrado !" });
        if (await User.findOne({ email })) return res.status(400).send({ error: "EMAIL j� cadastrado !" });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(201).send({ user, token: createToken(user.id) });

    } catch (err) {
        return res.status(500).send({ error: err });
    }

});

router.post('/auth', async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); 
    const { cpf, password } = req.body;
    if (!cpf || !password) return res.status(400).send({ error: "Dados insuficientes !" });

    try {
        const user = await User.findOne({ cpf }).select('+password');

        if (!user) return res.status(400).send({ error: "Usuario nao registrado !" });

        const pass = await bcrypt.compare(password, user.password);

        if (!pass) return res.status(400).send("Erro ao autenticar usuario");

        user.password = undefined;

        return res.status(202).send({ user, token: createToken(user.id)});
    } catch (err) {
        return res.status(500).send({ error: err });
    }
});


router.post('/update', auth, async (req, res) => {
    const {email, telefone, nomeExibicao } = req.body;

    try
    {        
        const filtro = { id: res.locals.auth_data };        
        const ret = await User.updateOne(filtro, req.body);
        if (!ret) return res.status(400).send({ error: "usu�rio n�o encontrado" });
        const user = await User.findOne(filtro);
        return res.send({ message: ret });
    }
    catch (err)    {
        return res.status(500).send(err.message);
    }
});
module.exports = router;