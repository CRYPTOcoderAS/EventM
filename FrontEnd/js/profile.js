const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const city = document.getElementById('city');
const Cooking = document.getElementById('interest1');
const Reading = document.getElementById('interest2');
const Coding = document.getElementById('interest3');
const Treking = document.getElementById('interest4');
const lab1 = document.getElementById("lab1");
const lab2 = document.getElementById("lab2");
const lab3 = document.getElementById("lab3");
const lab4 = document.getElementById("lab4");
const logoutBtn=document.getElementById('btn1');
const deletUserBtn=document.getElementById('btn2');
let baseUrl = 'http://localhost:8000/api/user';

if(!localStorage.getItem("userToken")){
    window.location.href="http://127.0.0.1:5500/Frontend/index.html";
}

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
    }
};


const fetchUser = async () => {
    try {
        const { data } = await axios.get(baseUrl, config);
        fname.innerText = data.firstName;
        lname.innerText = data.lastName;
        email.innerText = data.email;
        city.innerText = data.city;
        const interests = data.interests;
        if (interests.includes("Cooking")) Cooking.checked = true;
        if (interests.includes("Reading")) Reading.checked = true;
        if (interests.includes("Coding")) Coding.checked = true;
        if (interests.includes("Treking")) Treking.checked = true;
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

let interestObj = { Cooking, Reading, Coding, Treking };
console.log(interestObj)

const addInterest = (id, interest) => {
    let check = interestObj[interest].checked;
    console.log(check);
    axios.put(baseUrl + `/${id}/interest`, { check }, config)
        .then(() => {
            alert("Interest added/removed");
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
}

const logout=()=>{
    localStorage.removeItem("userToken");
}

const deleteUser=()=>{
    axios.delete(baseUrl, config)
    .then(()=>{
        logout();
        alert("User deleted");
        window.location.reload();
    })
    .catch((err)=>{
        console.log(err);
    })
}

logoutBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    logout();
    window.location.reload();
})

deletUserBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    deleteUser();
})

fetchUser();