//index.js

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schema from './schema';
import multer from 'multer';
import getConnection from './../libs/postgres.js';
import bodyParser from 'body-parser';

async function startApolloServer() {
  const pgClient = await getConnection();

  const server = new ApolloServer({
    schema,
    uploads: false,
    context: () => ({ pgClient }), // Pasar pgClient al contexto de Apollo Server
  });

  await server.start();

  const app = express();
  app.use(bodyParser.json({ limit: '10mb' })); // Ajusta el límite según tus necesidades

  // Configuración de Multer
  const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos temporales

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4002;

  app.listen(PORT, () => {
    console.log(`Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`);
  });
   // Agregar manejo de errores o registro de eventos aquí si es necesario
   pgClient.on('error', err => {
    console.error('Error en la conexión PostgreSQL:', err);
  });

  pgClient.on('notification', msg => {
    console.log('Notificación PostgreSQL:', msg);
  });
}

startApolloServer().catch(err => {
  console.error('Error al iniciar el servidor Apollo:', err);
});
