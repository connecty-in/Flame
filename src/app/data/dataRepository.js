var sql = require("../../../node_modules/mssql");
const sqlpool = new sql.ConnectionPool({
  user: process.env.db_username,
  password:process.env.db_password,
  server:process.env.db_server,
  database:'TestDatabase',
  "options":{
    "encrypt":true,
    "enableArithAbort":true
  },
})

function executeStatement(phone, callback) {
  console.log(`Phone is ${phone}`)
  sqlpool.connect(err => {
    if (err) throw err;
    sqlpool.query(`SELECT * FROM stud_data where phone = ${phone}`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      callback(result.recordset[0].firstName);
    })
  });
}

module.exports = {executeStatement}
