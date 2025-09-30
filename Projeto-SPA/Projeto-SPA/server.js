const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do multer (upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'upload'),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage }).single('arquivo');

// Rota de upload
app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) return res.status(500).send('Erro no upload.');
    res.send('Upload concluído com sucesso.');
  });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
