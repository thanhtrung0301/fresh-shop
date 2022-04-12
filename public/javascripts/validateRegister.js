
function Validator() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const c_password = document.getElementById('c_password');

    let check = true;
    if(username.value.length === 0) check = false;

    const isNotExist = username.getAttribute('check')
    if(!isNotExist) check = false;

    if(!(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(password.value)) check = false;
    
    if(password.value !== c_password.value || password.value === '') check = false;
      
    console.log(check)
    if (check) {
        document.getElementById('registerForm').submit();
        return true;  
    }
    return false;
}