const database = require('../../data/db-config')

function getAll(){
    return database('hobbits')
}

function getByID(){
    return database('hobbits')
    .where('id', id)
    .first()
}

async function insert(){
    return database('hobbits')
    .insert(hobbit)
    .then(([id])=>{
        return getByID(id)
    })
}
module.exports = {
    getAll,
    getByID,
    insert
}