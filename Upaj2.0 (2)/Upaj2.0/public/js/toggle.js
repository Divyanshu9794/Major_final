const signupBox = document.querySelector('.signup-box');
const loginBox = document.querySelector('.login-box');
const signinToggle = document.getElementById('signinToggle');
const signupToggle = document.getElementById('signupToggle');

signupToggle.onclick = ()=>{
    // title.innerHTML = "Sign Up";
    signupBox.style.display = "contents";
    loginBox.style.display = "none";
}
signinToggle.onclick = ()=>{
    // title.innerHTML = "Login";
    // nameField.style.display = "none";
    
    signupBox.style.display = "none";
    loginBox.style.display = "contents";
}

