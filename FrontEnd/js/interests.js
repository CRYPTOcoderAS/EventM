// interests.js
document.addEventListener('DOMContentLoaded', () => {
    const interestsSelect1 = document.querySelector('select[name="interests1"]');
    const interestsSelect2 = document.querySelector('select[name="interests2"]');
    const userInterestsDiv = document.createElement('div');
  
    // Fetch interests from the API
    axios.get('http://localhost:8000/api/interest')
      .then(response => {
        const interests = response.data;
  
        // Helper function to populate a select element
        function populateSelect(selectElement) {
          interests.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.interestName; // Assuming the interest name property is 'interestName'
            option.textContent = interest.interestName;
            selectElement.appendChild(option);
          });
        }
  
        // Populate the first select box
        populateSelect(interestsSelect1);
  
        // Populate the second select box
        populateSelect(interestsSelect2);
      })
      .catch(error => {
        console.error('Error fetching interests:', error);
      });
  
    // Event listener to handle selection and display selected interests
    function updateSelectedInterests() {
      const selectedInterests1 = Array.from(interestsSelect1.selectedOptions).map(option => option.value);
      const selectedInterests2 = Array.from(interestsSelect2.selectedOptions).map(option => option.value);
      const allSelectedInterests = [...selectedInterests1, ...selectedInterests2];
  
      // Clear previous selections before adding the current ones
      userInterestsDiv.innerHTML = '';
      allSelectedInterests.forEach(interest => {
        const interestItem = document.createElement('span');
        interestItem.textContent = interest;
        interestItem.classList.add('selected-interest');
        userInterestsDiv.appendChild(interestItem);
      });
    }
  
    interestsSelect1.addEventListener('change', updateSelectedInterests);
    interestsSelect2.addEventListener('change', updateSelectedInterests);
  
    // Append the user interests div to the document
    const interestsContainer = document.querySelector('.interests-container');
    interestsContainer.appendChild(userInterestsDiv);
  });
  