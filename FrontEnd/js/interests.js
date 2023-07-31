
document.addEventListener('DOMContentLoaded', () => {
    const interestsSelect1 = document.querySelector('select[name="interests1"]');
    const interestsSelect2 = document.querySelector('select[name="interests2"]');
    const userInterestsDiv = document.createElement('div');
  
   
    axios.get('http://localhost:8000/api/interest')
      .then(response => {
        const interests = response.data;
  
       
        function populateSelect(selectElement) {
          interests.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.interestName; 
            option.textContent = interest.interestName;
            selectElement.appendChild(option);
          });
        }
  
       
        populateSelect(interestsSelect1);
  
        populateSelect(interestsSelect2);
      })
      .catch(error => {
        console.error('Error fetching interests:', error);
      });
  
    function updateSelectedInterests() {
      const selectedInterests1 = Array.from(interestsSelect1.selectedOptions).map(option => option.value);
      const selectedInterests2 = Array.from(interestsSelect2.selectedOptions).map(option => option.value);
      const allSelectedInterests = [...selectedInterests1, ...selectedInterests2];
  
     
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
  
    
    const interestsContainer = document.querySelector('.interests-container');
    interestsContainer.appendChild(userInterestsDiv);
  });
  