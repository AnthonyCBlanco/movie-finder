 const TMDBapikey = 'd49378c8d91fbf3feb27659eb9dad49e'

// onClick Display movie details




// Function to convert fetch Data To Obj
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

 async function trendingBuildCarousel(){
   let trendingMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=d49378c8d91fbf3feb27659eb9dad49e'
   let trendingMovies; 
   trendingMovies = await fetchData(trendingMovies, trendingMoviesUrl)
   console.log(trendingMovies.results)
      for(var i = 0; i < 6; i++){
         let trendingMoivePosterUrl = 'https://image.tmdb.org/t/p/w500/' + trendingMovies.results[i].poster_path
         document.querySelector(".movie-poster"+i).src = trendingMoivePosterUrl    
      }
}

const searchBtnEl = document.querySelector('#search-btn')



//searches for TMDB with input from search box

async function searchForMovie(){ 
  var searchResultsContainer = document.querySelector('#search-results')

  var currentUrl = new URL(window.location.href);
  var searchTerm = document.querySelector('.search-input').value
  currentUrl.searchParams.set('searchTerm', searchTerm)
  window.history.replaceState({}, document.title, currentUrl)


  let searchUrl = 'https://api.themoviedb.org/3/search/movie?query=' + searchTerm + '&api_key=d49378c8d91fbf3feb27659eb9dad49e' 
  let searchData;
  searchData = await fetchData(searchData, searchUrl)

  for(var i=0; i < searchData.results.length; i++){
    var li = document.createElement('li')
    li.textContent = searchData.results[i].title
    searchResultsContainer.append(li)
  }

  console.log(searchData)
}


var currentPage = window.location.pathname
if(currentPage.endsWith('index.html')){
  trendingBuildCarousel()
  var homesearchBtnEl = document.querySelector('#search-btn-to-search')
  homesearchBtnEl.addEventListener('click', function(){
    document.location.href = './search.html'
  })
}
if(window.location.href.includes('search.html')){
    searchBtnEl.addEventListener('click', function(event){
      event.preventDefault()
      searchForMovie()
      window.onload = searchForMovie
      })
}




