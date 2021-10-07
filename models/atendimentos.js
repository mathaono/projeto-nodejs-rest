const moment = require('moment');
const connection = require('../infrastructure/connection');

class Atendimento {

    adiciona(atendimento, res) {
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = {...atendimento, dataCriacao, data}

        const clienteValido = atendimento.cliente.length >= 5;
        const dataValida = moment(data).isSameOrAfter(dataCriacao);

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data menor que a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome com caracteres insuficientes'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const retornaErros = erros.length
        if (retornaErros) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO Atendimentos SET ?'

            connection.query(sql, atendimentoDatado, (error, results) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json(results);
                }
            });
        }
    }
}

module.exports = new Atendimento