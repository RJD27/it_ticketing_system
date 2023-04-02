function AddUserToDatabase(
  connection,
  firstName,
  lastName,
  email,
  passwordHash
) {
  var query =
    "INSERT INTO users (FirstName, LastName, Email, PasswordHash) VALUES (?)";
  var values = [firstName, lastName, email, passwordHash];

  try
  {
    connection.query(query, [values], function (error, results) {
      if (error) {
        throw error;
      }
    });
  } catch (error) {
    if (error.code == 'ER_DUP_ENTRY')
    {
      console.log("${email} already exists in the database.");
    }
    return error
  }
}

function CheckIfEmailInDatabase(connection, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT 1 FROM Users WHERE Email = ?",
      email,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        
        if (results.length < 1) {
          return resolve(false);
        }
        return resolve(email);
      }
    );
  });
}

function GetUserPasswordHash(connection, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT PasswordHash FROM users WHERE Email = ?",
      email,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length < 1) {
          return reject(false);
        }
        return resolve(results);
      }
    );
  });
}

function GetUserDatabase(mysql) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "it_ticketing_system",
  });

  return connection;
}

exports.GetUserPasswordHash = GetUserPasswordHash;
exports.AddUserToDatabase = AddUserToDatabase;
exports.CheckIfEmailInDatabase = CheckIfEmailInDatabase;
exports.GetUserDatabase = GetUserDatabase;
