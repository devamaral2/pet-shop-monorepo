export const testPetQuery = `
      INSERT INTO pets (name, image_url, species)
      VALUES ('Rex', 'http://pic.com/rex.jpg', 'dog')
      RETURNING id;
    `;
