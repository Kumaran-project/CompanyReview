const stars = document.querySelectorAll(".star");
const ratingValueDisplay = document.getElementById("rating-value");
const companyNameInput = document.querySelector("#name");
const prosInput = document.querySelector("#pros");
const consInput = document.querySelector("#cons");
const form = document.querySelector(".rating-form");
const searchForm = document.querySelector(".search-form");
const search = document.querySelector(".search");
const companiesToAdd = document.querySelector(".companies-to-add");
let selectedRating = 0;

stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => {
    highlightStars(index + 1);
  });

  star.addEventListener("mouseout", () => {
    resetStars();
    highlightStars(selectedRating);
  });

  star.addEventListener("click", () => {
    selectedRating = index + 1;
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
  const company_reviews = {
    company_name: companyName,
    pros: pros,
    cons: cons,
    rating: selectedRating,
  };
  axios
    .post("http://localhost:5000/reviews", company_reviews)
    .then((response) => {
      console.log(response.data);
      //displayUserOnScreen([response.data]);
    })
    .catch((error) => console.log(error));
    form.reset();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  axios
    .get("http://localhost:5000/reviews")
    .then((response) => {
      console.log(response.data);
      console.log(search.value);
      const allcompany = response.data;
      const searchedCompany = allcompany.filter((company) => {
        if (search.value.toLowerCase() === company.company_name) return true;
      });
      console.log(searchedCompany);
      displayUserOnScreen(searchedCompany,searchedCompany[0].company_name);
    })
    .catch((error) => console.log(error));
});

function displayUserOnScreen(companies,companyName) {
  companiesToAdd.textContent="";
  let averageRating=0;
  let sum=0;
  for(let company of companies){
    sum+=company.rating;
  }
  averageRating=sum/companies.length;

  const averageRatingItem=document.createElement("h1");
  const companyh1=document.createElement("h1");
  companyh1.textContent=`Company name: ${companyName}`;
  averageRatingItem.textContent=`Average Company Rating: ${averageRating.toFixed(1)}`;
  companiesToAdd.append(companyh1,averageRatingItem);

  companies.forEach((company) => {
    const companyItem = document.createElement("li");
    companyItem.textContent = `Company: ${company.company_name}`;

    const prosItem = document.createElement("li");
    prosItem.textContent = `Pros: ${company.pros}`;

    const consItem = document.createElement("li");
    consItem.textContent = `Cons: ${company.cons}`;

    const ratingItem = document.createElement("li");
    ratingItem.innerHTML = `Rating: ${"★".repeat(company.rating)}`;
    const line=document.createElement("li");
    line.classList.add("line");

    companiesToAdd.append(companyItem,prosItem, consItem, ratingItem,line);

    // companyNameInput.value = "";
    // prosInput.value = "";
    // consInput.value = "";
    // selectedRating = 0;
    resetStars();
  });
}
