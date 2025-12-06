export const up = async function (knex) {
     await knex.schema.createTable('products', (table) => {
          table.increments('id').primary();
          table.integer('supplier_id');
          table.string('title', 255).notNullable();
          table.text('description');
          table.timestamps(true, true);
          table.integer('sold_count').defaultTo(0);

          table.foreign('supplier_id').references('id').inTable('suppliers').onDelete('SET NULL');

     });

     await knex.raw('CREATE INDEX search_idx ON products USING bm25 (id, title , sold_count) WITH (key_field="id");');

};

export const down = function (knex) {
     return knex.schema.dropTableIfExists('products');
};