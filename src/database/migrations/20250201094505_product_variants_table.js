export const up = function (knex) {
     return knex.schema.createTable('product_variants', (table) => {
          table.increments('id').primary();
          table.integer('product_id').notNullable();
          table.decimal('price', 10, 2).notNullable();
          table.integer('stock').notNullable().defaultTo(0);
          table.string('sku', 100).unique().notNullable();
          table.timestamps(true, true);

          table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
     });
};

export const down = function (knex) {
     return knex.schema.dropTableIfExists('product_variants');
};