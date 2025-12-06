export async function seed(knex) {
     const db = knex;
     const count = await db('attributes').count('id as count').first();
     if (count.count > 0) {
          console.log('Attributes table already seeded');
          return;
     }

     const attributes = [
          { name: 'Color', type: 'text' },
          { name: 'Size', type: 'text' },
          { name: 'Storage', type: 'text' },
          { name: 'Material', type: 'text' },
          { name: 'Weight', type: 'number' }
     ];

     console.log('Seeding attributes...');
     await db('attributes').insert(attributes);
     console.log('Attributes seeded');
}
