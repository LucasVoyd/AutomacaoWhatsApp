const { Client } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const client = new Client();

client.on('qr', (qr) => {
    console.log('QR Code:', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.post('/send-message', (req, res) => {
    const { telefone, mensagem } = req.body;
    
    client.sendMessage(`${telefone}@c.us`, mensagem)
        .then(() => res.status(200).send('Mensagem enviada com sucesso'))
        .catch(err => res.status(500).send('Erro ao enviar mensagem: ' + err));
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
