const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AgendamentoSchema = new Schema({
    dataInicio: { type: Date, required: true, unique: true, lowercase: true },
    usuarioAgendou: { type: String, required: true},
    agendamentoTipo: { type: Number, required: true },
    created: {type: Date, default: Date.now}
});

//AgendamentoSchema.pre('save', async function (next) {
//    let user = this;
//    if (!user.isModified('password')) return next();

//    user.password = await bcrypt.hash(user.password, 10);
//    return next();
//});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);