export const up = function (knex) {
     return knex.schema.createTable('categories', (table) => {
          table.increments('id').primary();
          table.string('name', 255).notNullable();
          table.timestamps(true, true);
     });
};

export const down = function (knex) {
     return knex.schema.dropTableIfExists('categories');
};