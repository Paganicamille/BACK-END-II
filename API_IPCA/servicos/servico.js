const dados = require('../dados/dados');

const buscarTodos = () => {
  return dados;
};

const buscarPorAno = (ano) => {
  return dados.filter((dado) => dado.ano === parseInt(ano));
};

const buscarPorId = (id) => {
  return dados.find((dado) => (buscarPorId) === parseInt(id));
};

const calcularReajuste = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
  const dadosFiltrados = dados.filter((dado) => {
    return (
      dado.ano >= anoInicial &&
      dado.ano <= anoFinal &&
      dado.mes >= mesInicial &&
      dado.mes <= mesFinal
    );
  });

  const resultado = dadosFiltrados.reduce((acumulador, atual) => {
    return acumulador * (1 + atual.ipca / 100);
  }, valor);

  return resultado;
};

module.exports = {
  buscarTodos,
  buscarPorId,
  calcularReajuste,
  buscarPorAno
};
