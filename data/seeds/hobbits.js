
exports.seed = function(knex) {
    return knex("hobbits").del()
      .then(function () {
        return knex("hobbits").insert([
          {id: 1, colName: "Frodo"},
          {id: 2, colName: "Sam"},
          {id: 3, colName: "Pippin"}
        ]);
      });
  };
  