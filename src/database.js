const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root_password',
    database: 'electrondb'
})

function getConnection() {
    return connection
}

module.exports = { getConnection }