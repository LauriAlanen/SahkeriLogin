function createAccount(){ /* This function creates new user accounts. Before creating we use confirmUser func to check if there is an account with the same name.*/
    let username = document.getElementById("new_username").value;
    let password = document.getElementById("new_password").value;
    let password2 = document.getElementById("password_confirm").value;

    if(confirmUser(1, username) != 2){ /* confirmUser has 2 params.  P1 is the type of request. P2 username to check.*/
      if (password != password2){
        document.getElementById("password_status").innerHTML = "Salasanat eivät täsmää!";
        document.getElementById("password_status").style.color = "red";
      } 

      else {
        toDB(username, password); /* If everything was successfull we send the user information to the DB. */
    }  
  } 

    else {
      document.getElementById("password_status").innerHTML = "Antamasi käyttäjä tunnus on jo käytössä!";
      document.getElementById("password_status").style.color = "red";
    }
}
  
function toDB(username, password){/* This function creates an SQL INSERT using ajax and php. */
  $.ajax({
      type: "POST",
      url: "connect.php",
      data: {username: username, password: password},
      success: function(data){
          document.getElementById("password_status").innerHTML = "Käyttäjä luotu onnistuneesti!";
          document.getElementById("password_status").style.color = "green";
      }
  });
}

function peekDB(user){/* This function creates and SQL QUERY using the given username*/
  return $.ajax({
    type: "POST",
    url: "retrieve.php",
    async : false,
    data: {username: user},
    success: function(data){
    }
  }); 
}

function confirmUser(type, user){ /* This is used for checking logins and to confirm during registeration that the username has not been taken.
                                            if the type is 0 we are doing a login check, if the type is 1 we are doing a register check. Return values --> 3 = Both
                                            password & username wass correct. 2 = Username was right. 1 = Password was wrong. 0 = Both wrong or unexcepted error*/
try{
    userDetails = peekDB(user).done(function(data){
    parsed_data = JSON.parse(data) /* Get the details of given username from DB */
  })

  username_db = parsed_data[0].username
  user_pw_db = parsed_data[0].PASSWORD
  console.log(username_db)

  switch(type){ /* 0 = login check 1 = register check */
    case 0:
    username_login = document.getElementById("username").value
    password_login = document.getElementById("password").value

    if(username_login == username_db && password_login == user_pw_db){
      return 3
    }
    else{
      throw "Käyttäjätunnus tai salasana väärin!"
    }

    case 1:
      console.log("ALREADY IN USE")
      return 2
  }
}

catch(error){       /* Handles all errors if given wrong values or invalid inputs */
  if(type == 0){
  document.getElementById("login_error").innerHTML = "Käyttäjätunnus tai salasana väärin!"
  document.getElementById("login_error").style.color = "red";
  setTimeout(() => {
    document.getElementById("login_error").innerHTML = ""
      }, 3000)
    }
    return 0
  }
}

function login(){
  let login_user = document.getElementById("username").value;
  if (confirmUser(0, login_user) == 3){
  console.log("Onnistuneesti kirjauduttu sisään!")
  }
}


