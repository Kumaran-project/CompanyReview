document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingValueDisplay = document.getElementById("rating-value");
  const companyNameInput = document.querySelector("#name");
  const prosInput = document.querySelector("#pros");
  const consInput = document.querySelector("#cons");
  const form = document.querySelector(".rating-form");
  const companiesToAdd = document.querySelector(".companies-to-add");

  let selectedRating = 0;
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      resetStars();
      highlightStars(index + 1);
    });

    star.addEventListener("mouseout", () => {
      resetStars();
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = index + 1;
      ratingValueDisplay.textContent = `Selected Rating: ${selectedRating}`;
    });
  });

  function highlightStars(count) {
    for (let i = 0; i < count; i++) {
      stars[i].classList.add("selected");
    }
  }

  
  function resetStars() {
    stars.forEach((star) => star.classList.remove("selected"));
  }

  
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const companyName = companyNameInput.value;
    const pros = prosInput.value;
    const cons = consInput.value;

    axios
    .post("http://localhost:5000/reviews", userDetails)
    .then((response) => {
      console.log(response.data);
      displayUserOnScreen([response.data]);
    })
    .catch((error) => console.log(error));

    if (companyName && pros && cons && selectedRating > 0) {
      // Create new review elements
      const companyItem = document.createElement("li");
      companyItem.textContent = `Company: ${companyName}`;

      const prosItem = document.createElement("li");
      prosItem.textContent = `Pros: ${pros}`;

      const consItem = document.createElement("li");
      consItem.textContent = `Cons: ${cons}`;

      const ratingItem = document.createElement("li");
      ratingItem.innerHTML = `Rating: ${'★'.repeat(selectedRating)}`; // Add the correct number of stars

      
      companiesToAdd.append(companyItem, prosItem, consItem, ratingItem);

      
      companyNameInput.value = '';
      prosInput.value = '';
      consInput.value = '';
      selectedRating = 0;
      resetStars();
      ratingValueDisplay.textContent = 'Selected Rating: 0';
    } else {
      alert("Please fill all fields and select a rating.");
    }
  });
});
