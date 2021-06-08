        var myInput2 = document.getElementById("pswl");
        var submit = document.getElementById("submit");
        var myInput = document.getElementById("psw");
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var length = document.getElementById("length");
        var symbol = document.getElementById("symbol");
        



        // When the user clicks outside of the password field, hide the message box
        myInput.onblur = function() {
                document.getElementById("message").style.display = "none";
                // document.getElementsByTagName("footer").classList.add('footerposition');

            }
            // When the user clicks on the password field, show the message box

        myInput.onfocus = function() {
                document.getElementById("message").style.display = "block";
            }
            // When the user starts to type something inside the password field

             function passwordstrength() {


            // Validate lowercase letters


            var lowerCaseLetters = /[a-z]/g;
            if (myInput.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }

            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if (myInput.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if (myInput.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }
            //validate symbols
            var symbols = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
            if (myInput.value.match(symbols)) {
                symbol.classList.remove("invalid");
                symbol.classList.add("valid");
            } else {
                symbol.classList.remove("valid");
                symbol.classList.add("invalid");
            }

            // Validate length
            if (myInput.value.length >= 8) {
                length.classList.remove("invalid");
                length.classList.add("valid");
               
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
                // myInput2.classList.remove("red");
            }
        }

         

            //this code failes to excecute

//         function passwordStrength() {

//             // var passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

//             if (myInput.value.length <= 8) {
//                 myInput2.classList.remove("red");
//                 myInput2.classList.remove("medium");
//                 myInput2.classList.remove("strong");

//             } else {
//                 console.log("password is too short/long")

//             }


//             if (myInput.value.length >= 8) {
//                 myInput2.classList.add("red");

//             } else {
//                 myInput2.classList.remove("red");

//             }


//             if (myInput.value.length >= 10) {
//                 myInput2.classList.remove("red");
//                 myInput2.classList.add("medium");
//             } else {
//                 myInput2.classList.remove("medium");
//                 myInput2.classList.add("red");
//             }
//             if (myInput.value.length >= 15) {
//                 myInput2.classList.remove("medium");
//                 myInput2.classList.add("strong");
//             } else {
//                 myInput2.classList.remove("strong");
//                 myInput2.classList.add("medium");

//             }

//         }



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
//phone number validation
        function phonenumber(inputtxt) {
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (inputtxt.value.match(phoneno)) {
                return true;
            } else {
                alert("invalid phone number");
                return false;
            }
        }


        // checks passWord strength
        function scorePassword(pass) {
            var score = 0;
            if (!pass)
                return score;

            // award every unique letter until 5 repetitions
            var letters = new Object();
            for (var i=0; i<pass.length; i++) {
                letters[pass[i]] = (letters[pass[i]] || 0) + 1;
                score += 5.0 / letters[pass[i]];
            }

            // bonus points for mixing it up
            var variations = {
                digits: /\d/.test(pass),
                lower: /[a-z]/.test(pass),
                upper: /[A-Z]/.test(pass),
                nonWords: /\W/.test(pass),
            }

            var variationCount = 0;
            for (var check in variations) {
                variationCount += (variations[check] == true) ? 1 : 0;
            }
            score += (variationCount - 1) * 10;

            return parseInt(score);
        }
        //Good passwords start to score around 60 or so, here's function to translate that in words:

        function checkPassStrength(pass) {
            var score = scorePassword(pass);
            var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

            if (pass.match(decimal) && score > 80){
                myInput.style.backgroundColor="green";

                return "strong";
            }

            if (pass.match(decimal) && score >=40){
                myInput.style.backgroundColor="orange";
            
                return "good";
                
            }
            if (score >= 30){
                myInput.style.backgroundColor="red";
                return "weak";
            }

            return "";
        }