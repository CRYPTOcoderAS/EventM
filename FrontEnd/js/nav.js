const navItems=document.getElementById('navbar-items');

const setItems=()=>{
    let html=``;
    if(localStorage.getItem("userToken")){
        html=`<li class="nav-item mx-3">
        <a class="nav-link" href="event.html">Events</a>
      </li>
      <li class="nav-item mx-3" id="navbar-items">
        <a class="nav-link" href="profile.html">Profile</a>
      </li>`;
    }
    else{
        html=`<li class="nav-item mx-3" id="navbar-items">
        <a class="nav-link" href="index.html">SignIn</a>
      </li>`;
    }
    navItems.innerHTML=html;
}

setItems();