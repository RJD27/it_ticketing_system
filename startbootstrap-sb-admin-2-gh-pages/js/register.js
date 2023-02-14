const bcrypt = require('bcrypt');
const { AddUserToDatabase, CheckIfEmailInDatabase, GetUserDatabase } = require('./databaseHandler');
const { ValidateRegister } = require('./validator');


async function TryRegisterUser(formBody, res) {
    const { error, value } = ValidateRegister(formBody);

    if (error) {
        console.log(error);
        return false;
    }

    const connection = GetUserDatabase();
    connection.connect();

    const isEmailInDatabase = await CheckIfEmailInDatabase(connection, value.email);
    if (isEmailInDatabase) {
        console.log(value.email + " is already in the database.")
        return true;
    }

    const passwordHash = await bcrypt.hash(value.password, 12);

    await AddUserToDatabase(connection,
        value.firstName,
        value.lastName,
        value.email,
        passwordHash
    );
    
    console.log(value.email + " has been added to the database.")
    return true;
}

exports.TryRegisterUser = TryRegisterUser;