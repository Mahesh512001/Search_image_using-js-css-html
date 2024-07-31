const accessKey = "0n0O_ApQ4_4lZ_K4WDNq0N3C5XWq4tM-rmT9hTZ-jHE"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementsByClassName("show-more")[0]
let a = document.createElement('h1');
a.innerHTML = "Loading.....";
searchResults.appendChild(a)
a.style.display = "none";

let inputData = "" ;
let page = 1;
async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    a.style.display ="block";
    const response = await fetch(url);
   const data = await response.json();
   a.style.display = "none";
   searchResults.innerHTML = ""


   const result = data.results;

   if(page === 1 ){
    searchResults.innerHTML = "";
   }

   result.map((result) => {
    const imagewrapper = document.createElement('div');
    imagewrapper.classList.add("search-result");
    const  image = document.createElement('img');
    image.src = result.urls.small;
    image.alt =  result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imageLink);
    searchResults.appendChild(imagewrapper);
   });

   page++
   if (page > 1 ){
    showMore.style.display = "block";
   }
}


formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click",() => {
    searchImages();
});















