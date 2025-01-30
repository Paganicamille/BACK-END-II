import express from 'express'
import { retornaCampeonatos } from './servico/retornaCampeonatos_servico.js';
//import pool from './servico/conexao.js';

 
const app = express();

app.get('/campeonatos', async (req,res)=> {
    const campeonatos = await retornaCampeonatos();
    res.json(campeonatos);
})

app.listen(9000, async ()=> {
    const data =  new Date();
    console.log('Servidor node iniciado em: '+data);
    //const conexao = await pool.getConnection();
    //console.log(conexao.threadId);
    //conexao.release();

})