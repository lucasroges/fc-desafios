const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const connection = mysql.createConnection(config)

const createTableCommand = 'CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))'
connection.query(createTableCommand)

const name = 'Lucas'
const insertCommand = `INSERT INTO people(name) values('${name}')`
connection.query(insertCommand)

app.get('/', (req, res) => {
    const selectCommand = 'SELECT name FROM people'
    connection.query(selectCommand, (err, values) => {
        if (err) {
            res.send(`<h1>Full Cycle</h1><br>${err.message}`)
        }
        const names = values.reduce((previousValue, currentValue) => {
            return previousValue + `- ${currentValue.name}<br>`
        
        }, '')
        res.send(`<h1>Full Cycle</h1><br>${names}`)
    })
    connection.end()    
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})