// profile.js
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const city = document.getElementById('city');

const baseUrl = 'http://localhost:8000/api/user';

if (!localStorage.getItem('userToken')) {
  window.location.href = 'http://127.0.0.1:5500/Frontend/index.html';
}

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
};

const fetchUser = async () => {
  try {
    const { data } = await axios.get(baseUrl, config);
    const user = data.User;
    fname.innerText = user.firstName;
    lname.innerText = user.lastName;
    email.innerText = user.email;
    city.innerText = user.city;
  } catch (error) {
    console.log(error);
  }
};



fetchUser();

