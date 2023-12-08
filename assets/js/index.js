 const TMDBapikey = 'd49378c8d91fbf3feb27659eb9dad49e'
const ytApiKey = 'AIzaSyCmgrUIFOh3Uvspmi-xHKA5vEFRZ5LKwec'


// Moving carousel for trending movies
// const scrollers = document.querySelectorAll('.scroller');
// if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
//   addAnimation();
// }

// function addAnimation(){
//   scrollers.forEach((scroller) =>{
//     scroller.setAttribute("data-animated", true);

//     const scrollerInner = scroller.querySelector('.scroller_inner');
//     const scrollerContent = Array.from(scrollerInner.children);

//     scrollerContent.forEach(item => {
//       const duplicatedItem = item.cloneNode(true);
//       duplicatedItem.setAttribute('aria-hidden', true);
//       scrollerInner.appendChild(duplicatedItem);
//     });
//   });
// }

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
      li.setAttribute('class', 'column is-one-quarter is')
      img.src = 'https://image.tmdb.org/t/p/w500/' + searchData.results[i].poster_path
      li.append(img)
      searchResultsContainer.append(li)
    }

  console.log(searchData)
}

// Fetchs details of Selected Movie And Builds The Details Page
function fetchDetails(movieId){

}


var movieDetails
movieDetails = fetchData(movieDetails, 'https://api.themoviedb.org/3/movie/1003598?&api_key=d49378c8d91fbf3feb27659eb9dad49e')
console.log(movieDetails)


function handleTitleClick(){
  document.location.href = './index.html'
}





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
      })
}

document.querySelector('#title-card').addEventListener('click', handleTitleClick)