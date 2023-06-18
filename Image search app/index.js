const apiKey ="5At9KiKwtyTPiY69qJBVeDnF3_baySJjc5R6DlhgQ1c";

const formEl = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults=document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData="";
let page;

async function searchImages(){
    inputData = searchInput.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
     if(page == 1){
        searchResults.innerHTML="";   
     }    
        const results = data.results;
        results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("card");
        const image=document.createElement("img")
        image.src= result.urls.small
        image.alt=result.alt_description;
        const imageLink =document.createElement("a")
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
        }
        ); 
        page++;
        if(page>1){
            showMore.style.display="block";
        }
}





formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    page=1;
    searchImages();
});

showMore.addEventListener("click",() => {
    searchImages();
});