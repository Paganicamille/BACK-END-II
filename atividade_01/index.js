const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('Servidor rodando na porta $(port)');
});
app.get ('/livros',( req,res) => {
 res.json(livros);
});

