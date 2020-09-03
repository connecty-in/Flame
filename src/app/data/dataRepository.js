var sql = require("../../../node_modules/mssql");
const sqlpool = new sql.ConnectionPool({
  user: process.env.flameDevSqlUser,
  password:process.env.flameDevSqlPass,
  server: process.env.flameDevSqlServer,
  database:process.env.flameDevSqlDatabase,
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
      if(result == null || result.recordset.length == 0){
        callback({error:400, roomKey:null});
      }else{
        // if (err) throw err;
        console.log(result);
        // callback(result.recordset[0].keytag);
        callback({error:0, roomKey:result.recordset[0].keytag});
      }
    })
  });
}

module.exports = {executeStatement}
