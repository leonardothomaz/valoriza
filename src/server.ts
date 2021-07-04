import express from 'express';

const app = express();

app.listen(3333, () => {
    console.log('servidor iniciado na porta 3333!');
});
