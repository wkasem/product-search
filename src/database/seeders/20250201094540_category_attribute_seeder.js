export async function seed(knex) {
     const db = knex;
     const count = await db('category_attribute').count('id as count').first();
     if (count.count > 0) {
          console.log('Category attributes table already seeded');
          return;
     }

     console.log('Seeding category attributes...');

     // Fetch IDs
     const categories = await db('categories').select('id', 'name');
     const attributes = await db('attributes').select('id', 'name');

     const getCategoryId = (name) => categories.find(c => c.name === name)?.id;
     const getAttributeId = (name) => attributes.find(a => a.name === name)?.id;

     const mappings = [
          {
               category: 'Electronics',
               attributes: ['Color', 'Storage', 'Weight']
          },
          {
               category: 'Smartphones',
               attributes: ['Color', 'Storage']
          },
          {
               category: 'Laptops',
               attributes: ['Color', 'Storage', 'Material']
          },
          {
               category: 'Home Appliances',
               attributes: ['Size', 'Color', 'Weight']
          },
          {
               category: 'Accessories',
               attributes: ['Color', 'Weight', 'Size']
          },
          {
               category: 'Cameras',
               attributes: ['Color', 'Weight']
          },
          {
               category: 'Gaming',
               attributes: ['Color', 'Storage']
          },
          {
               category: 'Tablets',
               attributes: ['Color', 'Storage']
          }
     ];

     for (const map of mappings) {
          const catId = getCategoryId(map.category);
          if (!catId) {
               console.warn(`Category ${map.category} not found for attribute mapping`);
               continue;
          }

          for (const attrName of map.attributes) {
               const attrId = getAttributeId(attrName);
               if (!attrId) {
                    console.warn(`Attribute ${attrName} not found for mapping to ${map.category}`);
                    continue;
               }

               await db('category_attribute').insert({
                    category_id: catId,
                    attribute_id: attrId
               });
          }
     }

     console.log('Category attributes seeded');
}
