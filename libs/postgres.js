import {Client} from 'pg';

 async function getConnection() {
  const client = new Client({
    host:'localhost',
    port: 5432,
    user: 'usuario',
    password: 'admin123',
    database: 'formulario'
  });
  try {
    await client.connect();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
    throw new Error('No se pudo conectar con la base de datos');
  }

  return client;
}


export default getConnection;
