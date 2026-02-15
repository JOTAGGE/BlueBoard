import app from "./app";
import { pool } from './database'


const PORT = process.env.PORT || 3000;

pool.connect()
  .then(() => {
    console.log('Banco conectado com sucesso 🔥')
  })
  .catch((err) => {
    console.error('Erro ao conectar:', err)
  })

  app.get('/create-user-test', async (req, res) => {
  await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)`,
    ['Gabriel', 'gabriel@email.com', '123456']
  )

  res.send('Usuário inserido')
})


  app.get('/test-db', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  res.json(result.rows)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});