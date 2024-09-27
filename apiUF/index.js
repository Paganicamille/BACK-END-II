const express = require('express');
const colecaoUf = require('./dados/dados.js');

const app = express();

app.get('/ufs', (req, res) => {
    res.json(colecaoUf.colecaoUf)
});

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    /*const uf = colecaoUf.colecaoUf.find(u => u.id === idUF);
    res.json(uf);*/
    let mensagemErro = '';
    let uf;

    if (!(isNaN(idUF))) {
        uf = colecaoUf.colecaoUf.find(u => u.id === idUF);
        if (!uf) {
            mensagemErro = 'UF não encontrado'
        }
    } else {
        mensagemErro = 'Requisição inválido';
    }
    if (uf) {
        res.json(uf);
    } else {
        res.status(484).json({ "erro": mensagemErro });
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});
