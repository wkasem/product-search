export async function seed(knex) {
     const db = knex;
     const count = await db('categories').count('id as count').first();
     if (count.count > 0) {
          console.log('Categories table already seeded');
          return;
     }

     const categories = [
          { name: 'Electronics' },
          { name: 'Smartphones' },
          { name: 'Laptops' },
          { name: 'Accessories' },
          { name: 'Home Appliances' },
          { name: 'Gaming' },
          { name: 'Cameras' }
     ];

     console.log('Seeding categories...');
     await db('categories').insert(categories);
     console.log('Categories seeded');
}
