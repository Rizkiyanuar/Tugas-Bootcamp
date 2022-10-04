const API_Key = "api_key=676a2ca3488e6b7416119dd4cd7d565d";
const BASE_URL = "https://api.themoviedb.org/3";
const url = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_Key;
const img_url = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_Key;

const main = document.getElementById("main");
const form = document.getElementById("form");
const Search = document.getElementById("Search"); 

getFilm(url);

function getFilm(url){
    fetch(url)
    .then(res => res.json()).then(data => {
        show(data.results);
    })
}

function show(data){
    main.innerHTML = "";

    data.forEach(Film => {
        const {title, poster_path, vote_average, overview} = Film
        const FilmElm = document.createElement("div");
        FilmElm.classList.add("Film");
        FilmElm.innerHTML = `
        <img src="${img_url+poster_path}" title="${title}">

        <div class="info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
    
        <div class="overview">
          <h3>${title}</h3>
          <p>${overview}</p>
        </div>`

        main.appendChild(FilmElm);
    })
}

function getColor(vote){
    if(vote >= 7){
        return "green";
    }else if(vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = Search.value;

    if(searchTerm){
        getFilm(searchURL +"&query="+ searchTerm)
    }else{
        getFilm(url);
    }
})