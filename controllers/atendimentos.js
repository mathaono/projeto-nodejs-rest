const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Tela inicial')
    });
    
    app.get('/atendimentos', (req, res) => {
        res.send('Tela de atendimentos via GET')
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);
    });
}