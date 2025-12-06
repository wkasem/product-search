export const up = function (knex) {
     return knex.schema.createTable('product_category', (table) => {
          table.increments('id').primary();
          table.integer('product_id').notNullable();
          table.integer('category_id').notNullable();
          table.timestamps(true, true);

          table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
          table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE');
          table.unique(['product_id', 'category_id']);
     });
};

export const down = function (knex) {
     return knex.schema.dropTableIfExists('product_category');
};