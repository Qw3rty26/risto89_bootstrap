function validateForm() {
  // Username validation
  var username = document.forms["loginForm"]["username"].value.trim(); // Trim to remove leading and trailing whitespace
  if (!username || /^\s*$/.test(username)) { // Check if username is null, empty, or contains only whitespace
    showErrorModal("Non hai inserito uno username!", "Il campo username risulta essere vuoto.<br>Perfavore inserisci lo username del tuo profilo.");
    return false;
  }

  // Password validation
  var password = document.forms["loginForm"]["password"].value.trim(); // Trim to remove leading and trailing whitespace
  if (!password || /^\s*$/.test(password)) { // Check if password is null, empty, or contains only whitespace
    showErrorModal("Non hai inserito la password!", "Il campo password risulta essere vuoto.<br>Perfavore inserisci la password del tuo profilo.");
    return false;
  }

  return true; // Form is valid
}


function makePasswordVisible(){
    var passwordBox = document.getElementById("password");
    if (passwordBox.type === "password"){
    	passwordBox.type = "text";
    }else{
	passwordBox.type = "password";
    }
}

function clearFields(){
   document.forms["loginForm"]["username"].value = "";
   document.forms["loginForm"]["password"].value = "";
   return;
}
