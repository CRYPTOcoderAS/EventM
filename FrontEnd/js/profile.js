// profile.js
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const city = document.getElementById('city');
const logoutBtn = document.getElementById('btn1');
const deleteUserBtn = document.getElementById('btn2');
const eventsList = document.getElementById('events-list');

const baseUrl = 'http://localhost:8000/api/user';
const eventbriteUrl='https://www.eventbriteapi.com/v3';

if (!localStorage.getItem('userToken')) {
  window.location.href = 'http://127.0.0.1:5500/Frontend/index.html';
}

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
};

const fetchEventName = async (eventId) => {
  try {
    const { data } = await axios.get(`${eventbriteUrl}/events/${eventId}`, config);
    return data.event.name.text;
  } catch (error) {
    console.log(error);
    return "Event Not Found";
  }
};

const logout = () => {
  localStorage.removeItem('userToken');
  window.location.href = 'http://127.0.0.1:5500/EventM/Frontend/index.html';
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

const fetchUser = async () => {
  try {
    const { data } = await axios.get(baseUrl, config);
    const user = data.User;

    // Update profile information
    document.getElementById('username').innerText = user.firstName + ' ' + user.lastName;
    fname.innerText = user.firstName;
    lname.innerText = user.lastName;
    email.innerText = user.email;
    city.innerText = user.city;

    // Update events list
    eventsList.innerHTML = '';
    if (user.events && user.events.length > 0) {
      const eventsHTML = await Promise.all(user.events.map(async (eventId) => {
        const eventName = await fetchEventName(eventId);
        return `<li>${eventId} - ${eventName}</li>`;
      }));
      eventsList.innerHTML = eventsHTML.join('');
    } else {
      eventsList.innerHTML = '<li>No events found.</li>';
    }

    // Update interests list
    const interestsList = document.getElementById('interests-list');
    interestsList.innerHTML = '';
    if (user.interests && user.interests.length > 0) {
      user.interests.forEach(interest => {
        const li = document.createElement('li');
        li.textContent = interest;
        interestsList.appendChild(li);
      });
    } else {
      interestsList.innerHTML = '<li>No interests found.</li>';
    }
  } catch (error) {
    console.log(error);
  }
};

fetchUser();
