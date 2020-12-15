var button = document.getElementById("submit");
button.addEventListener("click", jsform);

function jsform() {
  var fname = document.forms["RegForm"]["firstname"].value;
  var email = document.forms["RegForm"]["email"].value;
  var mobile = document.forms["RegForm"]["mobile"].value;

  if (fname == "") {
    document.getElementById("fname").innerHTML = "Please input your first name";
    return false;
  } else if (fname.length < 2) {
    document.getElementById("fname").innerHTML = "Please input correct name";
    return false;
  } else {
    document.getElementById("fname").innerHTML = "";
  }

  var atposition = email.indexOf("@");
  var dotposition = email.lastIndexOf(".");
  console.log("jsform -> dotposition", dotposition)


  if (mobile == "") {
    document.getElementById("mobile").innerHTML = "Please input your mobile number";
    return false;
  } else if (isNaN(mobile) || mobile.length < 9) {
    document.getElementById("mobile").innerHTML = "Please input valid mobile number";
    return false;
  } else {
    document.getElementById("mobile").innerHTML = "";
  }

  if (email == "") {
    document.getElementById("email").innerHTML = "Please input your email";
    return false;
  } else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
    document.getElementById("email").innerHTML = "Please input correct email address";
    return false;
  } else {
    document.getElementById("email").innerHTML = "";
  }
  
}




















