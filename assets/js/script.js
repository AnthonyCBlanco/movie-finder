 const TMDBapikey = 'd49378c8d91fbf3feb27659eb9dad49e'
let movieQuery = 'Finding Nemo' //Movie Query = Search Input
let movieQueryUrl = 'https://api.themoviedb.org/3/search/movie?query=' + movieQuery + '&api_key=d49378c8d91fbf3feb27659eb9dad49e' 

// onClick Display movie details

// Check Boxes For Genres

// Way to Chose Wether you are searching by production company, director, movie name, genre.

// Function to convert fetch Data To Obj
function fetchToObj(obj, fetchURL){
   fetch(fetchURL)
  .then(response => response.json())
  .then(data => {
    obj = data;
   })
  .then(() => {
    console.log(obj);
   })
   .catch(err => console.error(err));
}


fetchToObj(movieQuery, movieQueryUrl)

function trendingBuildCarousel(){
   let trendingMovies;
   let trendingMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=d49378c8d91fbf3feb27659eb9dad49e'
   fetchToObj(trendingMovies, trendingMoviesUrl)
   for(var i = 0; i < trendingMovies.length; i++){
      
   }
}