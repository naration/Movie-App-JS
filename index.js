import { key } from './key.js';

// Deklarasi variabel "movieNameRef" dan nilai elemen HTML dengan ID "movie-name"
// Digunakan untuk mengambil nilai input yang dimasukkan pengguna
let movieNameRef = document.getElementById("movie-name");

// Deklarasi variabel "searchBtn" dan nilai elemen HTML dengan ID "search-btn"
// Digunakan untuk menangkap kegiatan dari setiap klik pencarian 
let searchBtn = document.getElementById("search-btn");

// Deklarasi variabel "result" dan nilai elemen HTML dengan ID "result"
// Digunakan untuk menampilkan hasil pencarian
let result = document.getElementById("result");

// Fungsi fetch data dari API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }

    //Jika input tidak kosong
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //Jika film ada di dalam database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            // Jika film tidak ada di dalam database
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //Error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
