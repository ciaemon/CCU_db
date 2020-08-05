var connectionName = '37.195.45.169:3306';
var rootPwd = 'mySQLForgot12';
var user = 'ciaemon';
var userPwd = 'sqlForgot12';
var db = 'ccu';

var root = 'root';
var instanceUrl = 'jdbc:mysql://' + connectionName;
var dbUrl = instanceUrl + '/' + db;

/**
 * Create a new database within a Cloud SQL instance.
 */
function createDatabase() {
 var conn = Jdbc.getConnection('jdbc:mysql://sql9.freemysqlhosting.net:3306/sql9356953', 'sql9356953', 'vKMt2BbBis');
  conn.createStatement().execute('CREATE DATABASE ' + db);
}

/**
 * Create a new user for your database with full privileges.
 */
function createUser() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, root, rootPwd);

  var stmt = conn.prepareStatement('CREATE USER ? IDENTIFIED BY ?');
  stmt.setString(1, user);
  stmt.setString(2, userPwd);
  stmt.execute();

  conn.createStatement().execute('GRANT ALL ON `%`.* TO ' + user);
}

/**
 * Create a new table in the database.
 */
function createTable() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);
  conn.createStatement().execute('CREATE TABLE entries '
      + '(guestName VARCHAR(255), content VARCHAR(255), '
      + 'entryID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(entryID));');
}