const API_KEY = "81057545c5da43e188f255290510579e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));

// jab logo pe click kare to reload ho jaye
function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles); // card ke data me bind karna
}

function bindData (articles) {
    // card ka container lao
     const cardsContainer = document.getElementById('cards-container');
     // ab template lao
     const newsCardTemplate = document.getElementById('news-template-card');

     // dubara reload waqk
     cardsContainer.innerHTML = ""; // empty

     articles.forEach(article => {
        if(!article.urlToImage) return; // agar news ke saath uski image na aaye to uske mat show karo
        
        const cardClone = newsCardTemplate.content.cloneNode(true); // uski andar ki saari cheeze clone ho jaye jaise div ke andar ka div uske andar ka h2
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);

     });

     function fillDataInCard(cardClone,article) {

        // element lao
        const newsImg=cardClone.querySelector('#news-img');
        const newsTitle=cardClone.querySelector('#news-title');
        const newsSource=cardClone.querySelector('#news-source');
        const newsDesc=cardClone.querySelector('#news-desc');

        // ab usme API ka data Fill karo

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timezome:"Asia/Jakarta"
        });

        newsSource.innerHTML = `${article.source.name} . ${date}`;

     }

}


// Handling data using name 

let currentSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem =  document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');
}


// add search functionality

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);

    // agar kuch search kar rhe hai to nav me selection hta do
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;
})