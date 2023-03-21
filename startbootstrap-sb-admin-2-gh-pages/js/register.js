const bcrypt = require("bcrypt");
const mysql = require("mysql");
const {
  AddUserToDatabase,
  CheckIfEmailInDatabase,
  GetUserDatabase,
} = require("./databaseHandler");
const { ValidateRegister } = require("./validator");

async function TryRegisterUser(formBody, res) {
  const { error, value } = ValidateRegister(formBody);

  if (error) {
    return false;
  }

  const connection = GetUserDatabase(mysql);
  connection.connect((error) => {
    if (error) {
      return console.log(error);
    }
    console.log("DB connection established...");
  });

  const isEmailInDatabase = await CheckIfEmailInDatabase(
    connection,
    value.email
  );
  if (isEmailInDatabase) {
    console.log(value.email + " is already in the database.");
    return true;
  }

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(value.password, saltRounds);

  console.log("Adding user to database...");
  await AddUserToDatabase(
    connection,
    value.firstName,
    value.lastName,
    value.email,
    passwordHash
  );

  console.log(value.email + " has been added to the database.");
  return true;
}

exports.TryRegisterUser = TryRegisterUser;
