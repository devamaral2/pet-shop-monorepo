export function testClientQuery(petId: string) {
  return `
      INSERT INTO clients (name, email, pet_id)
      VALUES ('Test Client', 'test@email.com', '${petId}');
    `;
}
