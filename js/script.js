// This is where the popular movies will be display.
const movieDisplay = document.querySelector("#popular-movies");

// Fetch data from TMDB API
const api_Url = "https://api.themoviedb.org/3/";
const api_Key = "?api_key=a2cb6a5578c78a926883617fb6e2aedd";
const api_language = "&language=en-US"

// https://api.themoviedb.org/3/movie/popular?api_key=a2cb6a5578c78a926883617fb6e2aedd
// https://api.themoviedb.org/3/tv/popular?api_key=a2cb6a5578c78a926883617fb6e2aedd
// https://api.themoviedb.org/3/movie/popular?api_key=a2cb6a5578c78a926883617fb6e2aedd + &page=1
// https://api.themoviedb.org/3/tv/popular?api_key=a2cb6a5578c78a926883617fb6e2aedd + &page=1

// ########################################
// #            POPULAR MOVIES            #
// ########################################

async function fetchPopularMovies() {
  try {
    const response = await fetch(api_Url + 'movie/popular' + api_Key + api_language);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

const PopularMovies = async () => {
  const popular_movies = await fetchPopularMovies();
  const container = document.getElementById("popular-movies");
  popular_movies.forEach((popular_movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
                    <a href="movie-details.html?id=${popular_movie.id}">
                      <img
                        src="https://image.tmdb.org/t/p/original${popular_movie.poster_path}"
                        alt="${popular_movie.title}"
                      />
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">${popular_movie.title}</h5>
                      <p class="card-text">
                        <small class="text-muted">Release: ${popular_movie.release_date}</small>
                      </p>
                    </div>
                  
`;
    container.appendChild(div);
  });
};


// ########################################
// #            TV Shows            #
// ########################################

async function fetchTV_Shows() {
  try {
    const response = await fetch(api_Url + 'tv/popular' + api_Key + api_language);
    const tv_show_data = await response.json();
    return tv_show_data.results;
  } catch (error) {
    console.error(error);
  }
}

const TV_Shows = async () => {
  const TV_Shows = await fetchTV_Shows();
  const container = document.getElementById("popular-shows");
  TV_Shows.forEach((TV_Show) => {
    const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
            <a href="tv-details.html?id=${TV_Show.id}">
             <img src="https://image.tmdb.org/t/p/w500${TV_Show.poster_path}" class="card-img-top" alt="${TV_Show.name}"/> 
            </a>
            <div class="card-body">
              <h5 class="card-title">${TV_Show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Air Date: ${TV_Show.first_air_date}</small>
              </p>
            </div>
          `;
  
      document.querySelector("#popular-shows").appendChild(div);
    });
};




// ########################################
// #             Now Playing              #
// ########################################

async function fetchNowPlayingMovies() {
  try {
    const now_playing_response = await fetch(api_Url + 'movie/now_playing' + api_Key + api_language);
    const now_playing_data = await now_playing_response.json();
    return now_playing_data.results;
  } catch (error) {
    console.error(error);
  }
}

const NowPlayingMovies = async () => {
  const now_playing_movies = await fetchNowPlayingMovies();
  now_playing_movies.forEach((now_playing_movie) => {

    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
      <a href="movie-details.html?id=${now_playing_movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${now_playing_movie.poster_path}" alt="${now_playing_movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${now_playing_movie.vote_average} / 10
      </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);

    startSwiper();

  });
};



// ########################################
// #             Search Movies            #
// ########################################

const itemSearch = document.getElementById('search-term');
const itemPopularmovies = document.getElementById('popular-movies');

function search(e){
  const items = itemPopularmovies.querySelectorAll('.card-title');
  console.log(items);
  const text = e.target.value.toLowerCase();
  console.log(text);
  items.forEach((item) => {
  
    const itemName = item.firstChild.parentElement.innerText.toLowerCase();
    console.log(itemName);
    console.log(itemName.indexOf(text));

    if (itemName.indexOf(text) != -1) {
      document.getElementById("popular-movies").classList = "card2"

    } else {
      item.parentElement.parentElement.style.display = 'none';

    }
  });
}

// function init(){
  itemSearch.addEventListener('input', search);  
// }
// init();




// ########################################
// #            Movie Details             #
// ########################################
function fetchMovieDetail(){
if (
  window.location.href.indexOf('movie-details.html') > -1 ||
  window.location.href === `/movie-details.html`
) {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');

  // get movie details from TMDB API
  const getMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );
    console.log(response);
    const data = await response.json();
    return data;
  };

 // Overlay for background image
 displayBackgroundImage("tv", show.backdrop_path);
  
 const div = document.createElement("div");

 div.innerHTML = `
 <div class="details-top">
 <div>
 ${
   show.poster_path
     ? `<img
   src="https://image.tmdb.org/t/p/w500${show.poster_path}"
   class="card-img-top"
   alt="${show.name}"
 />`
     : `<img
 src="../images/no-image.jpg"
 class="card-img-top"
 alt="${show.name}"
/>`
 }
 </div>
 <div>
   <h2>${show.name}</h2>
   <p>
     <i class="fas fa-star text-primary"></i>
     ${show.vote_average.toFixed(1)} / 10
   </p>
   <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
   <p>
     ${show.overview}
   </p>
   <h5>Genres</h5>
   <ul class="list-group">
     ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
   </ul>
   <a href="${
     show.homepage
   }" target="_blank" class="btn">Visit show Homepage</a>
 </div>
</div>
<div class="details-bottom">
 <h2>Show Info</h2>
 <ul>
   <li><span class="text-secondary">Number of Episodes:</span> ${
     show.number_of_episodes
   }</li>
   <li><span class="text-secondary">Last Episode To Air:</span> ${
     show.last_episode_to_air.name
   }</li>
   <li><span class="text-secondary">Status:</span> ${show.status}</li>
 </ul>
 <h4>Production Companies</h4>
 <div class="list-group">
   ${show.production_companies
     .map((company) => `<span>${company.name}</span>`)
     .join(", ")}
 </div>
</div>
 `;

 document.querySelector("#show-details").appendChild(div);
}


}





// ########################################
// #          Calling Functions           #
// ########################################

// NowPlayingMovies();
// PopularMovies();
// TV_Shows();


function startSwiper() {
  const swiper = new Swiper(".swiper", {
    freeMode: true,
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}


