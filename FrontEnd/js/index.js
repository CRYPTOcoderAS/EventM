let registerForm=document.getElementById('register-form');
let loginForm=document.getElementById('login-form');
let baseUrl='http://localhost:8000/api/user';

if(localStorage.getItem("userToken")){
    window.location.href="http://127.0.0.1:5501/client/event.html";
}

// Register
registerForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let firstName=document.getElementById('fname1').value;
    let lastName=document.getElementById('lname1').value;
    let email=document.getElementById('email1').value;
    let city=document.getElementById('city1').value;
    let interests=document.getElementById('interests1')
    let password=document.getElementById('password1').value;
    // console.log(firstName.value,lastName.value,email.value,password.value,city.value);
    axios.post(baseUrl,{firstName,lastName,email,city,interests,password},{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res);
        alert("Registration successful");
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    });
    // console.log("clicked");
    document.getElementById('fname1').value=""
    document.getElementById('lname1').value=""
    document.getElementById('email1').value=""
    document.getElementById('city1').value=""
    document.getElementById('interests1').value=""
    document.getElementById('password1').value=""
})

// Login
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email=document.getElementById('email2').value;
    let password=document.getElementById('password2').value;
    // console.log(firstName.value,lastName.value,email.value,password.value,city.value);
    axios.post(baseUrl+'/login',{email,password},{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res.data.token);
        localStorage.setItem("userToken",res.data.token);
        alert("Login successful");
        window.location.href="http://127.0.0.1:5501/client/event.html";
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    });
    // console.log("clicked");
    document.getElementById('email2').value=""
    document.getElementById('password2').value=""
})