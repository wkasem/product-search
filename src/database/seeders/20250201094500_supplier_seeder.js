export async function seed(knex) {
     const db = knex;
     const count = await db('suppliers').count('id as count').first();
     if (count.count > 0) {
          console.log('Suppliers table already seeded');
          return;
     }

     console.log('Seeding suppliers...');
     const suppliers = [
          { name: 'Tech Distributors Inc', phone: '+1-555-0101', email: 'contact@techdist.com' },
          { name: 'Global Electronics', phone: '+1-555-0102', email: 'sales@globalelec.com' },
          { name: 'Fashion Wholesale Co', phone: '+1-555-0103', email: 'info@fashionwholesale.com' },
          { name: 'Home Goods Supplier', phone: '+1-555-0104', email: 'orders@homegoods.com' },
          { name: 'Sports Equipment LLC', phone: '+1-555-0105', email: 'support@sportseq.com' },
     ];
     await db('suppliers').insert(suppliers);
     console.log('Suppliers seeded');
}