async function getData() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } 
  
  getData();
  