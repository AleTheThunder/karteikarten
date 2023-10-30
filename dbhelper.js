//function for connecting to database
const mysql = require("mysql2");
require('dotenv').config();

const dbParams = { //Db config read from the .env file
    "connectionLimit" : process.env.CONNECTION_LIMIT,
    "host": process.env.HOST,
    "user": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE
}

let db;

try {
    db = mysql.createPool(dbParams);
}catch (e){
    console.log(e)
}

//function for making select query's with optional params
async function makeDbQuery(sqlQuery,params){
    return new Promise(resolve =>
    {
        //let db; n
        try {
            //db = mysql.createPool(dbParams);
            if (typeof(params) != "undefined") {
                db.getConnection((err, conn)=>{ //Get Connection from pool
                    //execute the query and store it in the DB (prepared statements)
                    if (err!=null){
                        console.log(err)
                    }
                    conn.execute(sqlQuery, params, async (err, results) => {
                        //console.log(err)
                        if (err!=null){
                            console.log(err)
                        }
                        resolve(results);
                    })
                    db.releaseConnection(conn); //Give the connection back to the DB
                })
            } else {
                db.getConnection((err, conn)=>{ //Get Connection from pool
                    //execute the query and store it in the DB (prepared statements)
                    conn.execute(sqlQuery, [], async (err, results) => {
                        //console.log(err)
                        resolve(results);
                    })
                    db.releaseConnection(conn); //Give the connection back to the DB
                })
            }
        } catch (err) {
            console.log(err)
            resolve(err);
        }
    });
}

module.exports={
    makeDbQuery
}