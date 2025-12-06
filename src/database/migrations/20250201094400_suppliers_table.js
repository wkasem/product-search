

export const up = function (knex) {
     return knex.schema.createTable('suppliers', (table) => {
          table.increments('id').primary();
          table.string('name', 255).notNullable();
          table.string('phone', 50);
          table.string('email', 255);
          table.timestamps(true, true);
     });
};

export const down = function (knex) {
     return knex.schema.dropTable('suppliers');
};