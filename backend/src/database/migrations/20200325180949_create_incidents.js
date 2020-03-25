
//execução da migration -> cria a tabela
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function ( table ){
    //chave primária incremental 
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    //chave estrangeira -> vincula com id da tabela ongs
    table.string('ong_id').notNullable()
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

//se houver algo errado -> reverter deletando a tabela
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};