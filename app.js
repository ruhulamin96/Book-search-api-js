// -----------------load Book section-------------------//

const loadBook = async () => {
  let searchText = document.getElementById("searchText").value;
  document.getElementById("searchText").value = "";
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${searchText}`
  );
  const data = await response.json();
  if (data.numFound === 0) {
    document.getElementById("showFound").innerText = `Opps!!!! No Book Found`;
    document.getElementById("card_display").textContent = "";
  } else {
    document.getElementById(
      "showFound"
    ).innerText = `Total Book Found ${data.numFound}`;
    displayBook(data.docs);
  }
};

// --------------Display Book Section----------//

const displayBook = (data) => {
  let parentId = document.getElementById("card_display");
  parentId.textContent = "";
  let sliceData = data.slice(0, 48);

  // ---------------For each loop------------------------//

  sliceData.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("col-lg-3");
    div.classList.add("m-4");
    div.innerHTML = `<div class="card h-100 shadow rounded" style="width: 18rem">
    <img style="width:260px; height:280px" src="${
      element.cover_i === undefined
        ? `./images/image_not_found.jpg`
        : `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`
    }"  class="card-img-top mx-auto" alt="Image Not Found" />
    <div class="card-body">
      <p> <span class="text-success fw-bold fs-5">Book Name:</span> ${
        element.title === undefined ? "Not found" : element.title
      }</p>
      <p ><span class="text-success fw-bold fs-5">Author Name:</span> ${
        element.author_name === undefined ? "Not Found" : element.author_name
      }</p>
      <p><span class="text-success fw-bold fs-5">Publisher:</span> ${
        element.publisher === undefined ? "Not Found" : element.publisher
      }</p>
      <p><span class="text-success fw-bold fs-5">First Published:</span> ${
        element.first_publish_year === undefined
          ? "Not Found"
          : element.first_publish_year
      }</p>
    </div>
  </div>`;
    parentId.appendChild(div);
  });
};
