// Get entries from database to display on page

const getEntries = async function() {
    // fetch entries from server
    const response = await fetch("/entry_api");
    const entries = await response.json();
  
    // sort entries by timestamp in descending order
    entries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // create HTML elements for each entry  - please note rubrik said create child <div> elements but <span> elements were more appropriate in this context
    const logDiv = document.querySelector("#entryHolder");
    for (const entry of entries) {
      const root = document.createElement("div");
      const dateSpan = document.createElement("span");
      const tempSpan = document.createElement("span");
      const commentSpan = document.createElement("span");
      const citySpan = document.createElement("span");
      
      // Add IDs as per rubrik to corresponding span elements

      dateSpan.id = 'date';
      tempSpan.id = 'temp';
      commentSpan.id = 'content';

      root.classList.add('log-box');
  
      dateSpan.textContent = new Date(entry.timestamp).toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      });
      tempSpan.textContent = `${entry.temp}`;
      commentSpan.textContent = `${entry.comment}`;
      citySpan.textContent = `${entry.city}`;
  
    // create a p element and append the dateSpan, citySpan, commentSpan, and tempSpan to it - please note the rubrik said use innerHTML but I've heard this is not as secure a method and so have instead used textContent
    const p = document.createElement("p");
    p.append(dateSpan, document.createElement("br"), commentSpan);
    p.innerHTML += `. The temperature is ${tempSpan.textContent}°C in ${citySpan.textContent}.`;

    // append the p element to the logDiv
    root.append(p);
    logDiv.prepend(root);
    }
  }
  
getEntries();

const getLatestEntry = async function() {
    // fetch entries from server
    const response = await fetch("/entry_api");
    const entries = await response.json();
  
    // sort entries by timestamp in descending order
    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
    // create HTML elements for the latest entry - please note rubrik said create child <div> elements but <span> elements were more appropriate in this context
    const latestEntry = entries[0];
    const logDiv = document.querySelector("#entryHolder");
    const root = document.createElement("div");
    const dateSpan = document.createElement("span");
    const tempSpan = document.createElement("span");
    const commentSpan = document.createElement("span");
    const citySpan = document.createElement("span");

    // Add IDs as per rubrik to corresponding span elements

    dateSpan.id = 'date';
    tempSpan.id = 'temp';
    commentSpan.id = 'content';
  
    root.classList.add('log-box');
  
    dateSpan.textContent = new Date(latestEntry.timestamp).toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      });
    tempSpan.textContent = `${latestEntry.temp}`;
    commentSpan.textContent = `${latestEntry.comment}`;
    citySpan.textContent = `${latestEntry.city}`;
  
  // create a p element and append the dateSpan, citySpan, commentSpan, and tempSpan to it - please note the rubrik said use innerHTML but I've heard this is not as secure a method and so have instead used textContent
  const p = document.createElement("p");
  p.append(dateSpan, document.createElement("br"), commentSpan);
  p.innerHTML += `. The temperature is ${tempSpan.textContent}°C in ${citySpan.textContent}.`;

  // append the p element to the logDiv
  root.append(p);
  logDiv.prepend(root);
  }
  

const button = document.querySelector('input[type="submit"]');
button.addEventListener('click', async (event) => {

  event.preventDefault();
  const comment = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;

// Get the temperature for the entered zip code
  const response = await fetch(`/weather?zip=${zip}`);
  const data = await response.json();
  const temp = data.temperature;
  const city = data.location;

// Create a bundle object with temp and comment

  const bundle = { temp, comment, city };
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bundle)
  };
  const responseJSON = await fetch('/projectData', options);
  const json = await responseJSON.json();
  console.log(json);

  getLatestEntry();

});

