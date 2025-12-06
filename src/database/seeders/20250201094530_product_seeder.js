export async function seed(knex) {
     const db = knex;
     const count = await db('products').count('id as count').first();
     if (count.count > 0) {
          console.log('Products table already seeded');
          return;
     }

     console.log('Seeding products, variants, and relationships with hardcoded data...');

     // Pre-fetch maps for ID lookups
     const suppliers = await db('suppliers').select('id', 'name');
     const categories = await db('categories').select('id', 'name');
     const attributes = await db('attributes').select('id', 'name');

     const getSupplierId = (name) => suppliers.find(s => s.name === name)?.id;
     const getCategoryId = (name) => categories.find(c => c.name === name)?.id;
     const getAttributeId = (name) => attributes.find(a => a.name === name)?.id;


     const productsData = [
          {
               title: 'iPhone 15 Pro Max',
               description: 'Latest flagship smartphone with A17 Pro chip and titanium design',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Smartphones'],
               variants: [
                    {
                         price: 1199.99,
                         stock: 50,
                         sku: 'APPL-IP15PM-256-TI',
                         attributes: { 'Color': 'Titanium', 'Storage': '256GB' }
                    },
                    {
                         price: 1399.99,
                         stock: 30,
                         sku: 'APPL-IP15PM-512-TI',
                         attributes: { 'Color': 'Titanium', 'Storage': '512GB' }
                    }
               ]
          },
          {
               title: 'Samsung Galaxy S24 Ultra',
               description: 'Premium Android phone with S Pen and 200MP camera',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Smartphones'],
               variants: [
                    {
                         price: 1299.99,
                         stock: 45,
                         sku: 'SAMS-S24U-256-BK',
                         attributes: { 'Color': 'Black', 'Storage': '256GB' }
                    }
               ]
          },
          {
               title: 'MacBook Pro 16-inch M3',
               description: 'Powerful laptop for professionals with M3 Max chip',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Laptops'],
               variants: [
                    {
                         price: 2499.99,
                         stock: 30,
                         sku: 'APPL-MBP16-M3-1TB',
                         attributes: { 'Color': 'Space Gray', 'Storage': '1TB', 'Material': 'Aluminum' }
                    }
               ]
          },
          {
               title: 'Dell XPS 15',
               description: 'Premium Windows laptop with OLED display',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Laptops'],
               variants: [
                    {
                         price: 1899.99,
                         stock: 25,
                         sku: 'DELL-XPS15-512',
                         attributes: { 'Color': 'Silver', 'Storage': '512GB' }
                    }
               ]
          },
          {
               title: 'Sony WH-1000XM5',
               description: 'Industry-leading noise cancelling headphones',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Accessories'],
               variants: [
                    {
                         price: 399.99,
                         stock: 100,
                         sku: 'SONY-WH1000XM5-BK',
                         attributes: { 'Color': 'Black', 'Weight': '250' }
                    }
               ]
          },
          {
               title: 'AirPods Pro 2nd Gen',
               description: 'Wireless earbuds with active noise cancellation',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Accessories'],
               variants: [
                    {
                         price: 249.99,
                         stock: 150,
                         sku: 'APPL-APP2',
                         attributes: { 'Color': 'White' }
                    }
               ]
          },
          {
               title: 'LG OLED C3 55-inch TV',
               description: '4K OLED TV with stunning picture quality',
               supplier: 'Home Goods Supplier',
               categories: ['Electronics', 'Home Appliances'],
               variants: [
                    {
                         price: 1499.99,
                         stock: 20,
                         sku: 'LG-OLEDC3-55',
                         attributes: { 'Size': '55 inch', 'Color': 'Black' }
                    }
               ]
          },
          {
               title: 'PlayStation 5',
               description: 'Next-gen gaming console with 4K gaming',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Gaming'],
               variants: [
                    {
                         price: 499.99,
                         stock: 35,
                         sku: 'SONY-PS5-STD',
                         attributes: { 'Color': 'White', 'Storage': '825GB' }
                    }
               ]
          },
          {
               title: 'Xbox Series X',
               description: 'Powerful gaming console with Game Pass',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Gaming'],
               variants: [
                    {
                         price: 499.99,
                         stock: 40,
                         sku: 'MSFT-XSX',
                         attributes: { 'Color': 'Black', 'Storage': '1TB' }
                    }
               ]
          },
          {
               title: 'Nintendo Switch OLED',
               description: 'Hybrid gaming console with vibrant OLED screen',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Gaming'],
               variants: [
                    {
                         price: 349.99,
                         stock: 60,
                         sku: 'NINT-SW-OLED-WHT',
                         attributes: { 'Color': 'White', 'Storage': '64GB' }
                    }
               ]
          },
          {
               title: 'Canon EOS R5',
               description: 'Professional mirrorless camera with 8K video',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Cameras'],
               variants: [
                    {
                         price: 3899.99,
                         stock: 15,
                         sku: 'CANON-R5-BODY',
                         attributes: { 'Color': 'Black' }
                    }
               ]
          },
          {
               title: 'GoPro Hero 12',
               description: 'Action camera with incredible stabilization',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Cameras'],
               variants: [
                    {
                         price: 399.99,
                         stock: 55,
                         sku: 'GOPRO-H12',
                         attributes: { 'Color': 'Black' }
                    }
               ]
          },
          {
               title: 'Dyson V15 Detect',
               description: 'Cordless vacuum with laser dust detection',
               supplier: 'Home Goods Supplier',
               categories: ['Home Appliances'],
               variants: [
                    {
                         price: 649.99,
                         stock: 30,
                         sku: 'DYSON-V15',
                         attributes: { 'Color': 'Gold', 'Weight': '3000' }
                    }
               ]
          },
          {
               title: 'iPad Air 5th Gen',
               description: 'Versatile tablet with M1 chip',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Tablets'], // Note: 'Tablets' category might be missing in categorySeeder, will fallback or need update
               variants: [
                    {
                         price: 599.99,
                         stock: 70,
                         sku: 'APPL-IPAD-AIR5-64-BL',
                         attributes: { 'Color': 'Blue', 'Storage': '64GB' }
                    }
               ]
          },
          {
               title: 'Samsung Galaxy Tab S9',
               description: 'Premium Android tablet with S Pen included',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Tablets'],
               variants: [
                    {
                         price: 799.99,
                         stock: 40,
                         sku: 'SAMS-TABS9-128-GR',
                         attributes: { 'Color': 'Graphite', 'Storage': '128GB' }
                    }
               ]
          },
          {
               title: 'Bose QuietComfort 45',
               description: 'Premium noise cancelling headphones',
               supplier: 'Global Electronics',
               categories: ['Electronics', 'Accessories'],
               variants: [
                    {
                         price: 329.99,
                         stock: 80,
                         sku: 'BOSE-QC45-BLK',
                         attributes: { 'Color': 'Black' }
                    }
               ]
          },
          {
               title: 'Logitech MX Master 3S',
               description: 'Premium wireless mouse for productivity',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Accessories'],
               variants: [
                    {
                         price: 99.99,
                         stock: 120,
                         sku: 'LOGI-MXM3S-GR',
                         attributes: { 'Color': 'Graphite' }
                    }
               ]
          },
          {
               title: 'Apple Watch Series 9',
               description: 'Advanced smartwatch with health monitoring',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics', 'Accessories'],
               variants: [
                    {
                         price: 399.99,
                         stock: 90,
                         sku: 'APPL-AW9-MID',
                         attributes: { 'Color': 'Midnight', 'Size': '45mm' } // 'Size' defined in attributeSeeder
                    }
               ]
          },
          {
               title: 'Kindle Paperwhite',
               description: 'Waterproof e-reader with adjustable warm light',
               supplier: 'Tech Distributors Inc',
               categories: ['Electronics'],
               variants: [
                    {
                         price: 139.99,
                         stock: 100,
                         sku: 'AMZN-KPW-16',
                         attributes: { 'Storage': '16GB', 'Color': 'Black' }
                    }
               ]
          },
          {
               title: 'Ring Video Doorbell Pro 2',
               description: 'Smart doorbell with 3D motion detection',
               supplier: 'Home Goods Supplier',
               categories: ['Electronics', 'Home Appliances'],
               variants: [
                    {
                         price: 249.99,
                         stock: 65,
                         sku: 'RING-VDP2',
                         attributes: { 'Color': 'Satin Nickel' }
                    }
               ]
          }
     ];

     for (const productData of productsData) {
          const supplierId = getSupplierId(productData.supplier);
          if (!supplierId) {
               console.warn(`Supplier ${productData.supplier} not found, skipping product ${productData.title}`);
               continue;
          }

          // Insert Product
          const [result] = await db('products').insert({
               title: productData.title,
               description: productData.description,
               supplier_id: supplierId,
               sold_count: Math.floor(Math.random() * 501)
          }).returning('id');
          const productId = result.id;

          // Attach Categories
          for (const catName of productData.categories) {
               const catId = getCategoryId(catName);
               if (catId) {
                    try {
                         await db('product_category').insert({
                              product_id: productId,
                              category_id: catId
                         });
                    } catch (e) { /* ignore duplicates */ }
               } else {
                    // console.warn(`Category ${catName} not found used in ${productData.title}`);
               }
          }

          // Insert Variants and Attributes
          for (const variantData of productData.variants) {
               const [result] = await db('product_variants').insert({
                    product_id: productId,
                    price: variantData.price,
                    stock: variantData.stock,
                    sku: variantData.sku
               }).returning('id');
               const variantId = result.id;

               // Attach Attributes
               for (const [attrName, attrValue] of Object.entries(variantData.attributes)) {
                    const attrId = getAttributeId(attrName);
                    if (attrId) {
                         // Find or create attribute value
                         let valueId;
                         const existingValue = await db('attribute_values')
                              .where('attribute_id', attrId)
                              .where('value', attrValue)
                              .first();

                         if (existingValue) {
                              valueId = existingValue.id;
                         } else {
                              const [newValue] = await db('attribute_values').insert({
                                   attribute_id: attrId,
                                   value: attrValue
                              }).returning('id');
                              valueId = newValue.id;
                         }

                         // Link variant to attribute value
                         await db('product_variant_attribute_value').insert({
                              variant_id: variantId,
                              attribute_value_id: valueId
                         });
                    } else {
                         // console.warn(`Attribute ${attrName} not found used in ${productData.title}`);
                    }
               }
          }
     }
     console.log(`Seeded ${productsData.length} products with specific variants and hardcoded attributes`);
}