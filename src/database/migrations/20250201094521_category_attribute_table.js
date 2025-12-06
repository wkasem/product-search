export const up = function (knex) {
     return knex.schema.createTable('category_attribute', (table) => {
          table.increments('id').primary();
          table.integer('attribute_id').notNullable();
          table.integer('category_id').notNullable();
          table.timestamps(true, true);

          table.foreign('attribute_id').references('id').inTable('attributes').onDelete('CASCADE');
          table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE');
          table.unique(['attribute_id', 'category_id']);
     });
};

export const down = function (knex) {
     return knex.schema.dropTableIfExists('category_attribute');
};