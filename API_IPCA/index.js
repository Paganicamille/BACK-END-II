
const express = require('express');
const servico = require('./servicos/servico');

const app = express();
app.use(express.json());

app.get('/historicoIPCA', (req, res) => {
  const dados = servico.buscarTodos();
  res.json(dados);
});

app.get('/historicoIPCA/:ano', (req, res) => {
  const ano = req.params.ano;
  const dados = servico.buscarPorAno(ano);
  if (dados.length > 0) {
    res.json(dados);
  } else {
    res.status(404).send({ "erro": "Nenhuma dado encontrada" });
  }
});

app.get('/historicoIPCA/:id', (req, res) => {
  const id = ('buscarPorId');
  const dado = servico.buscarPorId(id);
  if (dado) {
    res.json(dado);
  } else if (isNaN(parseInt(id))) {
    res.status(400).send({ "erro": "Requisição inválida" });
  } else {
    res.status(404).send({ "erro": "Dado não encontrada" });
  }
});

app.get('/historicoIPCA/calculo', (req, res) => {
  const valor = req.query.valor;
  const mesInicial = req.query.mesInicial;
  const anoInicial = req.query.anoInicial;
  const mesFinal = req.query.mesFinal;
  const anoFinal = req.query.anoFinal;

  if (
    anoInicial > anoFinal ||
    (anoInicial === anoFinal && mesInicial > mesFinal)
  ) {
    res.status(400).send({ "erro": "Data inicial inválida" });
  } else {
    const resultado = servico.calcularReajuste(
      valor,
      mesInicial,
      anoInicial,
      mesFinal,
      anoFinal
    );
    res.json({ resultado });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
