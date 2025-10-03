const express = require("express");
const app = express();

const mysql = require("mysql2/promise");
const morgan = require("morgan");
app.use(morgan("dev"));
require("dotenv").config();
app.use(express.json());

let connection;
async function initDB() {
    try {
        connection = await mysql.createConnection({
            host: process.env.host,
            port: process.env.port,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database  
        });
        console.log("DB Connected")
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
}
initDB();

app.get("/createdb", (req, res) => {
    let sql = 'CREATE DATABASE faOne';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("databse created....");
    })
});

app.get("/createtable", (req, res) => {
    let sql = 'CREATE TABLE useres(ID INT AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), PRIMARY KEY(ID))';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created....");
    });
});


app.post("/createUsers", async(req, res) => {
    let {name, email} = req.body;
    let data = await connection.query(`INSERT INTO useres (name, email) VALUES (?, ?)`, [name, email]);
    res.send("useres created");
});


app.put("/updateUser/:id", async(req, res) => {
    try {
        const userID = req.params.id;
        const {name, email} = req.body;
        const [result] = await connection.query( `UPDATE useres SET name = ?, email = ? WHERE id = ?`, [name, email, userID]) ;
        res.status(200).send({success: true, message: "User update successfull"});
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

app.delete("/deleteUser/:id", async(req, res) => {
    try {
        const userID = req.params.id;
        const result = await connection.query(`DELETE FROM useres WHERE id = ?`, userID);
        res.status(200).send({success: true, message: "User is deleted"});
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("server is running on port 3000");
});