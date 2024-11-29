const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'leovv',
  password: process.env.DB_PASSWORD || 'leovv',
  database: process.env.DB_NAME || 'leovv',
});

//       - DB_HOST=mysql
//       - DB_USER=root
//       - DB_PASSWORD=root
//       - DB_NAME=leovv

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao banco de dados!');
  }
});


// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha primeira API NodeJs com bando de dados MYSQL! E utilizando MultiContainers Docker Compose');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

let usuarios = [];

// CREATE - Adicionar um usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const id = usuarios.length + 1;
  const novoUsuario = { id, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// READ - Listar todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// READ - Obter um usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id == id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// UPDATE - Atualizar um usuário
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const usuario = usuarios.find(u => u.id == id);
  if (usuario) {
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    res.json(usuario);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// DELETE - Remover um usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex(u => u.id == id);
  if (index !== -1) {
    usuarios.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

