const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware para lidar com dados JSON
app.use(express.json());

// Configurações do banco de dados
const pool = new Pool({
    user: 'admin',
    host: 'postgres',
    database: 'tasks',
    password: 'postgres',
    port: 5432,
});

// Rota para adicionar tarefa ao banco de dados
app.post('/addTask', async (req, res) => {
    const { columnId, taskInput } = req.body;

    try {
        const result = await pool.query('INSERT INTO tasks (column_id, task_description) VALUES ($1, $2)', [columnId, taskInput]);
        res.status(200).json({ message: 'Tarefa adicionada com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
