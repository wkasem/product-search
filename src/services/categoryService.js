import db from '../config/database.js';

class CategoryService {
     async index() {
          const categories = await db('categories').select('id', 'name');
          return categories;
     }
     async getAttributes(categoryId) {
          const attributes = await db('attributes')
               .select(
                    'attributes.id',
                    'attributes.name',
                    'attributes.type',
                    'attribute_values.id as value_id',
                    'attribute_values.value'
               )
               .join('category_attribute', 'attributes.id', 'category_attribute.attribute_id')
               .leftJoin('attribute_values', 'attributes.id', 'attribute_values.attribute_id')
               .where('category_attribute.category_id', categoryId);

          const groupedAttributes = {};

          for (const row of attributes) {
               if (!groupedAttributes[row.id]) {
                    groupedAttributes[row.id] = {
                         id: row.id,
                         name: row.name,
                         type: row.type,
                         values: []
                    };
               }

               if (row.value_id && row.value) {
                    groupedAttributes[row.id].values.push({
                         id: row.value_id,
                         value: row.value
                    });
               }
          }

          return Object.values(groupedAttributes);
     }
}

export default new CategoryService();
