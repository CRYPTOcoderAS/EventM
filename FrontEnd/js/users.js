document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.getElementById("userTableBody");
  
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM2NjU4Nzg5YzVlNDU4NTg3NzdmMWUiLCJpYXQiOjE2OTA4Mjc5NzgsImV4cCI6MTY5MDkxNDM3OH0.huVw337szgxXkvtRKOeMbHxbtf-QG-AGMU6tdOit0lY";
    
   
    fetch("http://localhost:8000/api/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          data.users.forEach((user) => {
         
            const row = document.createElement("tr");
  
        
            const nameCell = document.createElement("td");
            nameCell.textContent = user.firstName + " " + user.lastName;
            row.appendChild(nameCell);
  
            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);
  
            const cityCell = document.createElement("td");
            cityCell.textContent = user.city;
            row.appendChild(cityCell);
  
            const interestsCell = document.createElement("td");
            interestsCell.textContent = user.interests.join(", "); 
            row.appendChild(interestsCell);
  
            const eventsCell = document.createElement("td");
            eventsCell.textContent = user.events.join(", ");
            row.appendChild(eventsCell);
  
            
            userTableBody.appendChild(row);
          });
        } else {
       
          const row = document.createElement("tr");
          const messageCell = document.createElement("td");
          messageCell.colSpan = 5; 
          messageCell.textContent = "No users found";
          row.appendChild(messageCell);
          userTableBody.appendChild(row);
        }
      })
      .catch((error) => {
      
        console.error("Error fetching users:", error);
        const row = document.createElement("tr");
        const messageCell = document.createElement("td");
        messageCell.colSpan = 5; 
        messageCell.textContent = "Error fetching users";
        row.appendChild(messageCell);
        userTableBody.appendChild(row);
      });
  });
  