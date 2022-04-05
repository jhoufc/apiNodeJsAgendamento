const express = require('express');
const router = express.Router();
const Agendamento = require('../model/agendamentoMd');
const auth = require('../middlewares/auth');
const env = require("../config/config");


router.get('/', auth, (req, res) => {
    Agendamento.find({}, (err, data) => {
        if (err) return res.status(500).send({ error: err });
        return res.send(data);
    });
});


//router.post('/create', async (req, res) => {
//    const { email, password} = req.body;

//    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes !' });

//    try {
//        if (await User.findOne({ email })) return res.status(400).send({ error: "Email já existe !" });

//        const user = await User.create(req.body);

//        user.password = undefined;

//        return res.status(201).send({ user, token: createToken(user.id) });

//    } catch (err) {
//        return res.status(500).send({ error: err });
//    }

//});

//router.post('/auth', async (req, res) => {
//    const { cpf, password } = req.body;
//    if (!cpf || !password) return res.status(400).send({ error: "Dados insuficientes !" });

//    try {
//        const user = await User.findOne({ cpf }).select('+password');

//        if (!user) return res.status(400).send({ error: "Usuario nao registrado !" });

//        const pass = await bcrypt.compare(password, user.password);

//        if (!pass) return res.status(400).send("Erro ao autenticar usuario");

//        user.password = undefined;

//        return res.status(202).send({ user, token: createToken(user.id)});
//    } catch (err) {
//        return res.status(500).send({ error: err });
//    }
//});


//router.post('/update', auth, async (req, res) => {
//    const {email, telefone, nomeExibicao } = req.body;

//    try
//    {        
//        const filtro = { id: res.locals.auth_data };        
//        const ret = await User.updateOne(filtro, req.body);
//        if (!ret) return res.status(400).send({ error: "usuário não encontrado" });
//        const user = await User.findOne(filtro);
//        return res.send({ message: ret });
//    }
//    catch (err)    {
//        return res.status(500).send(err.message);
//    }
//});
module.exports = router;