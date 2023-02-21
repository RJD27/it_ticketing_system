const mysql_connector = require('mysql');
const { func } = require("joi");

function AddUserToDatabase(connection, firstName, lastName, email, passwordHash) {
    var query = "INSERT INTO users (FirstName, LastName, Email, PasswordHash) VALUES (?)";
    var values = [
        firstName,
        lastName,
        email,
        passwordHash,
    ];

    connection.query(query, [values], function (error) {
        if (error) {
            throw error;
        }
    });
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
                return resolve(true);
            });
    })
}

function GetUserDatabase() {
    const connection = mysql_connector.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'PB23Group',
        database: 'it_ticketing_system'
    });

    return connection;
}

exports.AddUserToDatabase = AddUserToDatabase;
exports.CheckIfEmailInDatabase = CheckIfEmailInDatabase;
exports.GetUserDatabase = GetUserDatabase;