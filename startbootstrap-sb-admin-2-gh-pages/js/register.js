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
  let result = {};

  if (error) {
    result["valid"] = false;
    result["message"] = error['details'][0].message;
    console.log(error);
    return result;
  }

  const connection = GetUserDatabase(mysql);
  connection.connect((error) => {
    if (error) {
      result["valid"] = false;
      result["message"] = " Could not connect to database, please try again later. ";
      console.log(error);
      return result;
    }
    console.log("DB connection established...");
  });

  const isEmailInDatabase = await CheckIfEmailInDatabase(
    connection,
    value.email
  );
  if (isEmailInDatabase) {
    result["valid"] = false;
    result["message"] = " " + value.email + " is already in the database. ";
    return result;
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
  
  result["valid"] = true;
  result["message"] = " " + value.email + " has been added to the database. ";
  return result;
}

exports.TryRegisterUser = TryRegisterUser;
