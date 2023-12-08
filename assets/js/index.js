 const TMDBapikey = 'd49378c8d91fbf3feb27659eb9dad49e'
 const youtubeApiKey = 'AIzaSyCmgrUIFOh3Uvspmi-xHKA5vEFRZ5LKwec'

// onClick Display movie details




// Function to convert fetch Data To Obj
// Obj = The variable you would like to store the Fetched Data in
// Url = The Url to fetch from
async function fetchData(obj, url) {
   try {
     const response = await fetch(url);
 
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
 
     obj = await response.json();
     return obj;
   } catch (error) {
     console.error('Error fetching data:', error.message);
     throw error;
   }
 }

 // Builds Carousel Cards
 async function trendingBuildCarousel(){
   let trendingMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=d49378c8d91fbf3feb27659eb9dad49e'
   let trendingMovies; 
   trendingMovies = await fetchData(trendingMovies, trendingMoviesUrl)
   console.log(trendingMovies.results)
      for(var i = 0; i < 12; i++){
         let trendingMoivePosterUrl = 'https://image.tmdb.org/t/p/w500/' + trendingMovies.results[i].poster_path
         document.querySelector(".movie-poster"+i).src = trendingMoivePosterUrl  
         document.querySelector(".movie-poster"+i).setAttribute('data-movieID', trendingMovies.results[i].id)  
      }
}

const searchBtnEl = document.querySelector('#search-btn')

//searches for TMDB with input from search box

async function searchForMovie(){ 
  var searchResultsContainer = document.querySelector('#search-results')
  searchResultsContainer.innerHTML = "" 
  var currentUrl = new URL(window.location.href);
  var searchTerm = document.querySelector('.search-input').value
  currentUrl.searchParams.set('searchTerm', searchTerm)
  window.history.replaceState({}, document.title, currentUrl)
  document.querySelector('#search_results_title').textContent = searchTerm

  let searchUrl = 'https://api.themoviedb.org/3/search/movie?query=' + searchTerm + '&api_key=d49378c8d91fbf3feb27659eb9dad49e' 
  let searchData;
  searchData = await fetchData(searchData, searchUrl)

  // Error Messege If No Results Found
    if(searchData.results.length == 0){ 
      searchResultsContainer.textContent = ('Sorry, We Couldnt Find Anything Under That Name Please Try Again')
      return
    }
  // Builds Search Results Cards
    for(var i=0; i < searchData.results.length; i++){ 
      var li = document.createElement('li')
      var img = document.createElement('img')
      li.textContent = searchData.results[i].title
      li.setAttribute('class', 'column is-one-quarter is ')
      img.setAttribute('class', 'poster')
      img.setAttribute('data-movieID', searchData.results[i].id)
      img.src = 'https://image.tmdb.org/t/p/w500/' + searchData.results[i].poster_path
      li.append(img)
      searchResultsContainer.append(li)
    }

  console.log(searchData)
  handlePosterClick()
}

// Fetchs details of Selected Movie And Builds The Details Page
async function fetchDetails(){
  const movieposterEl = document.querySelector('#movie-poster')
  const descriptionEl = document.querySelector('#movie-summary')
  const titleEl       = document.querySelector('#movie-title')
  const releaseEl     = document.querySelector('#movie-release')
  

  var params = new URLSearchParams(document.location.search)
  var movieId = params.get("movieID")
  let detailsURL = 'https://api.themoviedb.org/3/movie/' + movieId + '?&api_key=d49378c8d91fbf3feb27659eb9dad49e'

  var detailsData = await fetchData(detailsData, detailsURL)
  console.log(detailsData)

  movieposterEl.src         = 'https://image.tmdb.org/t/p/w500/' + detailsData.poster_path
  descriptionEl.textContent = detailsData.overview
  titleEl.textContent       = detailsData.title
  releaseEl.textContent     = detailsData.release_date
  

  

}



//Brings User Back To Main Page Upon Clicking The Title Card
function handleTitleClick(){
  document.location.href = './index.html'
}

// Poster Event Handler/Takes User To Details Page of the Selected Movie
function handlePosterClick(){
  var imgEl = document.querySelectorAll('.poster')
  imgEl.forEach(poster =>{
    poster.addEventListener('click', function(event){
      console.log('btn clicked')
      console.log(event.target.getAttribute('data-movieID'))
      var currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('movieID', event.target.getAttribute('data-movieID'))
      window.history.replaceState({}, document.title, currentUrl)
      document.location.href = './details.html?movieID=' + event.target.getAttribute('data-movieID')

    }) 
})}

var currentPage = window.location.pathname
// Only runs this code if on Main Page
if(currentPage.endsWith('index.html') || currentPage.endsWith('movie-finder/')){
  trendingBuildCarousel()
  var homesearchBtnEl = document.querySelector('#search-btn-to-search')
  homesearchBtnEl.addEventListener('click', function(){
    document.location.href = './search.html'
  })
}

// Only runs this code if on search page
if(window.location.href.includes('search.html')){
    searchBtnEl.addEventListener('click', function(event){
      event.preventDefault()
      searchForMovie()
      window.onload = searchForMovie
        var input = document.getElementById("searchinput");
        input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});
      })
}

// Only runds this code if on details page
if(window.location.href.includes('details.html')){
  window.onload = fetchDetails
  var homesearchBtnEl = document.querySelector('#search-btn-to-search')
  homesearchBtnEl.addEventListener('click', function(){
    document.location.href = './search.html'
  })
}

// Execute a search when the user presses the 'enter' key on the keyboard

handlePosterClick()
document.querySelector('#title-card').addEventListener('click', handleTitleClick)