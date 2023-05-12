// This is where the popular movies will be display.
const movieDisplay = document.querySelector("#popular-movies");

// Fetch data from TMDB API
const api_Url = "https://api.themoviedb.org/3/movie/";
const api_Key = "?api_key=a2cb6a5578c78a926883617fb6e2aedd";


// ########################################
// #            POPULAR MOVIES            #
// ########################################

async function fetchPopularMovies() {
  try {
    const response = await fetch(api_Url + 'popular' + api_Key);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
  console.log(response);
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

PopularMovies();


// ########################################
// #             Now Playing              #
// ########################################

async function fetchNowPlayingMovies() {
  try {
    const now_playing_response = await fetch(api_Url + 'now_playing' + api_Key);
    const now_playing_data = await now_playing_response.json();

    console.log(now_playing_data);

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
NowPlayingMovies();

function startSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
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

