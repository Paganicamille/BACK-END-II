import cors from 'cors';
import express from 'express';
import { retornaCampeonatos} from './servico/retornaCampeonatos_servico.js';
import { retornaCampeonatosID } from './servico/retornaCampeonatos_servico.js';
import { retornaCampeonatosAno} from './servico/retornaCampeonatos_servico.js';
import { retornaCampeonatosTime} from './servico/retornaCampeonatos_servico.js';
import { cadastroCampeonato } from './servico/cadastroCampeonato_servico.js';
import { atualizaCampeonato } from './servico/atualizaCampeonato_servico.js';

const app = express();
app.use(cors());
app.use(express.json()); //Suporte para JSON no corpo da resiquisicao
 
//  app.get('/campeonatos', async (req, res) => {
//      const campeonatos = await retornaCampeonatos();
//    res.json(campeonatos)
//  })

app.put('/campeonatos/:id', async (req, res) =>{
  const{id} = req.params;
  const{campeao, vice, ano} = req.body;

  if (campeao == undefined || vice == undefined || ano == undefined) {
    res.status(400).send('Nem todos os campos foram informados')    
  } else {
    const resultado = await atualizaCampeonato(id, campeao, vice, ano)
    if (resultado.affectedRows > 0) {
      res.status(202).send('Registro atualizado com sucesso');
    } else {
      res.status(400).send('Registro não encontrado');
      
    }
    
  }

})

app.post('/campeonatos', async (req, res) => {
  const campeao = req.body.campeao;
  const vice = req.body.vice;
  const ano = req.body.ano;
  await cadastroCampeonato (campeao, vice, ano);
  res.status(204).send({"Mensagem": "Cadastro efetivado com sucesso!"});

})

 app.get('/campeonatos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const campeonato = await retornaCampeonatosID(id);
    if(campeonato.length > 0){
      res.json(campeonato);
    } else{
      res.status(404).json({ mensagem: "Nenhum campeonato encontrado"});
    }
});

// app.get('/campeonatos', async (req, res) => {
//   let campeonatos;

//   const ano = req.query.ano;

//   if (typeof ano === 'undefined'){
//     campeonatos = await retornaCampeonatos();
//   } else {
//     campeonatos = await retornaCampeonatosAno(parseInt(ano));
//   }

//   if(campeonatos.length > 0) {
//     res.json(campeonatos);
//   } else{
//     res.status(404).json({ mensagem: "Nenhum campeonato encontrado"});
//   }
//   //pesquisar:http://localhost:9000/campeonatos?ano=2002

// })

app.get('/campeonatos', async (req, res) => {
  let campeonatos;
  
  const ano = req.query.ano;
  const time = req.query.time;

  if (typeof ano === 'undefined' && typeof time === 'undefined'){
    campeonatos = await retornaCampeonatos();
  } 
  else if (typeof ano !== 'undefined') {
    campeonatos = await retornaCampeonatosAno(ano);
  }
  else if (typeof time !== 'undefined') {
    campeonatos = await retornaCampeonatosTime(time);
  }

  if(campeonatos.length > 0) {
    res.json(campeonatos);
  } else{
    res.status(404).json({ mensagem: "Nenhum campeonato encontrado"});
  }

})



app.listen(9000, async () => {
    const data = new Date();
    console.log("Servidor node iniciado em: "+data);

    // const conexao = await pool.getConnection();
    // console.log(conexao.threadId);
    // conexao.release();
    //testar no mysql, caso erro
})

//instalar uma biblioteca chamada cors paraque o express aceite rotas diferentes
//vai  no console e coloca npm install cors e la em cima importar 'import cors from 'cors';