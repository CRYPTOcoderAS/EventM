// profile.js
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const city = document.getElementById('city');
const logoutBtn = document.getElementById('btn1');
const deleteUserBtn = document.getElementById('btn2');

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

// ... previous code ...

const eventsList = document.getElementById('events-list');

<<<<<<< HEAD
const fetchUser = async () => {
  try {
    const { data } = await axios.get(baseUrl, config);
    const user = data.User;
    fname.innerText = user.firstName;
    lname.innerText = user.lastName;
    email.innerText = user.email;
    city.innerText = user.city;

    if (user.events && user.events.length > 0) {
      const eventsHTML = user.events.map((eventId) => `<li>${eventId}</li>`).join('');
      eventsList.innerHTML = eventsHTML;
    } else {
      eventsList.innerHTML = '<li>No events found.</li>';
=======
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
>>>>>>> 9525539 (took pull from remote)
    }
  } catch (error) {
    console.log(error);
  }
};

// ... previous code ...


const logout = () => {
  localStorage.removeItem('userToken');
  window.location.href = 'http://127.0.0.1:5500/Frontend/index.html';
};

const deleteUser = () => {
  axios
    .delete(baseUrl, config)
    .then(() => {
      logout();
      alert('User deleted');
    })
    .catch((err) => {
      console.log(err);
    });
};

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logout();
});

deleteUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  deleteUser();
});

fetchUser();
