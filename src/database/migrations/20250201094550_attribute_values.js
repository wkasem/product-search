export const up = async function (knex) {
     await knex.schema.createTable('attribute_values', (table) => {
          table.increments('id').primary();
          table.integer('attribute_id').notNullable();
          table.string('value', 255).notNullable();
          table.timestamps(true, true);

          table.foreign('attribute_id').references('id').inTable('attributes').onDelete('CASCADE');
     });

     await knex.schema.createTable('product_variant_attribute_value', (table) => {
          table.increments('id').primary();
          table.integer('variant_id').notNullable();
          table.integer('attribute_value_id').notNullable();
          table.timestamps(true, true);

          table.foreign('variant_id').references('id').inTable('product_variants').onDelete('CASCADE');
          table.foreign('attribute_value_id').references('id').inTable('attribute_values').onDelete('CASCADE');
     });

     await knex.schema.dropTableIfExists('variant_attribute');
};

export const down = async function (knex) {
     await knex.schema.createTable('variant_attribute', (table) => {
          table.increments('id').primary();
          table.integer('attribute_id').notNullable();
          table.integer('variant_id').notNullable();
          table.string('value', 255).notNullable();
          table.timestamps(true, true);

          table.foreign('attribute_id').references('id').inTable('attributes').onDelete('CASCADE');
          table.foreign('variant_id').references('id').inTable('product_variants').onDelete('CASCADE');
     });

     await knex.schema.dropTableIfExists('product_variant_attribute_value');
     await knex.schema.dropTableIfExists('attribute_values');
};
