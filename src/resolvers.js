
export const resolvers = {
  Query: {
    hello: () => {
      return 'Hola mundo!';
    },

      // Ejemplo de consulta para obtener todos los formularios en PostgreSQL
      formResponse: async (_, __, {pgClient}) => {
        try {
          const query = `SELECT * FROM formulario;`;
          const result = await pgClient.query(query);
          return result.rows;
        } catch (error) {
          console.error('Error al obtener los formularios:', error);
          throw new Error('No se pudieron obtener los formularios');
        }
      }
    },

  Mutation: {
    submitForm: async (_, { input }, { pgClient }) => {


      try {


        // Guardar el formulario en PostgreSQL
        const query = `
          INSERT INTO formulario (nombre, apellido, asunto, archivo, fecharegistro)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
        `;

        const values = [
          input.nombre,
          input.apellido,
          input.asunto,
          input.archivo,
          new Date(input.fecharegistro), // Convierte fecharegistro a un objeto Date si es necesario


        ];

        const result = await pgClient.query(query, values);
        const savedFormPostgres = result.rows[0];
        console.log('Formulario guardado en PostgreSQL:', savedFormPostgres);

        // Devuelve los datos guardados como respuesta (desde PostgreSQL)
        return {
          id: savedFormPostgres.id, // Ajusta según la estructura de tu tabla en PostgreSQL
          nombre: savedFormPostgres.nombre,
          apellido: savedFormPostgres.apellido,
          asunto: savedFormPostgres.asunto,
          archivo: savedFormPostgres.archivo,
          fecharegistro: savedFormPostgres.fecharegistro.toISOString(), // Convertir fecha a ISO para respuesta GraphQL

        };
      } catch (error) {
        console.error('Error en submitForm:', error);
        throw new Error('Error al guardar el formulario');
      }
}
}
}
