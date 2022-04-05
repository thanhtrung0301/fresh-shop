
function Validator() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const c_password = document.getElementById('c_password');

    let flag = 0;
    if(username.value.length === 0) {
        let usernameError = username.parentElement.querySelector('span');
        usernameError.innerText = 'You must enter username';
        usernameError.style.color = 'red';
        flag--;
    }
    else {
        flag++;
        let usernameError = username.parentElement.querySelector('span');
        usernameError.innerText = '';
    }


    if((/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(password.value) === false) {
        let passError = password.parentElement.querySelector('span');
        passError.innerText = 'You password is too weak ';
        passError.style.color = 'red';
        flag--;
    }
    else {
        flag++;
        let passError = password.parentElement.querySelector('span');
        passError.innerText = '';
    }

    if(password.value !== c_password.value) {
        let confirmError = c_password.parentElement.querySelector('span');
        confirmError.innerText = 'Password and confirm password not match';
        confirmError.style.color = 'red';
        flag--;
    }
    else {
        flag++;
        let confirmError = c_password.parentElement.querySelector('span');
        confirmError.innerText = '';
    }

    console.log(flag);
    if (flag === 3) {
        document.getElementById('registerForm').submit();
        return true;  
    }
    return false;
}