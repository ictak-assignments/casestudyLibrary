//password validation
function CheckPassword(inputtxt) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (inputtxt.value.match(decimal)) {
        alert('valid password')
        return true;
    } else {
        alert('invalid password')
        return false;
    }
}


//email validation 
//  submit.addEventListener('click', ValidateEmail(document.form1.email1))

function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.value.match(mailformat)) {
        alert("Valid email address!");
        document.form1.email1.focus();
        return true;
    } else {
        alert("You have entered an invalid email address!");
        document.form1.email1.focus();
        return false;
    }
}