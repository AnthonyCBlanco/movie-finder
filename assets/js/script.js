 const TMDBapikey = 'd49378c8d91fbf3feb27659eb9dad49e'
let movieQuery = 'Bullet Train'

 fetch('https://api.themoviedb.org/3/search/movie?query=' + movieQuery + '&api_key=d49378c8d91fbf3feb27659eb9dad49e')
 .then(function(response){
    return response.json();
 })
 .then(function (data){
    console.log(data);
 })
 
