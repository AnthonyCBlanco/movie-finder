 const TMDBapikey = 'd49378c8d91fbf3feb27659eb9dad49e'
let movieQuery = 'Finding Nemo' //Movie Query = Search Input
let movieQueryUrl = 'https://api.themoviedb.org/3/search/movie?query=' + movieQuery + '&api_key=d49378c8d91fbf3feb27659eb9dad49e' 

// onClick Display movie details

// Check Boxes For Genres

// Way to Chose Wether you are searching by production company, director, movie name, genre.

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
     throw error; // You can choose to handle the error differently if needed
   }
 }


// fetchToObj(movieQuery, movieQueryUrl)

 async function trendingBuildCarousel(){
   let trendingMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=d49378c8d91fbf3feb27659eb9dad49e'
   let trendingMovies; 
   trendingMovies = await fetchData(trendingMovies, trendingMoviesUrl)
   console.log(trendingMovies.results)
   for(var i = 0; i < trendingMovies.results.length; i++){
      let trendingMoivePoster= trendingMovies.results[i].poster_path
      console.log (trendingMoivePoster)
      
   }

}
trendingBuildCarousel()
