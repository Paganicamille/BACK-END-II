import pool from "./conexao.js";

export async function atualizaCampeonato(id, campeao, vice, ano) {
    const conexao = await pool.getConnection();
    const query = "UPDATE campeonatos SET campeao = ?, vice = ?, ano = ? WHERE id = ?";
    const [resposta] = await conexao.execute(query, [campeao, vice, ano, id])
    console.log(resposta);
    //id tem que vim por ultimo por causa da ordem
    conexao.release();
    return resposta;
}

export async function atualizaCampeonatoParcial(id, campos) {
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`). join(",");
}
