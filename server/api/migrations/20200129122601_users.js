exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username", 30)
      .notNullable()
      .unique();
    table.string("password", 30).notNullable();
    table.string("department", 30);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
