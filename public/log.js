async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    for (const item of data) {
      const root = document.createElement("div");
      const date = document.createElement("div");
      const zip = document.createElement("div");
      const comment = document.createElement("div");
      const logDiv = document.querySelector("#log-div");

      root.classList.add('log-box');

      date.textContent = new Date(item.timestamp).toLocaleString();
      zip.textContent = `${item.zip}`;
      comment.textContent = `${item.comment}`

      root.append(date, zip, comment);
      logDiv.append(root);
    }
  }

  getData();