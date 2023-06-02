async function getTrendingMoviesPreview() {
    const res = await fetch('http://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    const sinopsis = data.results[0].overview;
    tends__preview.innerHTML = "";

    movies.forEach(movie => {
        const tendCard = document.createElement('div');
        const posterImg = document.createElement('img');
        tendCard.classList.add('tends__card');
        posterImg.setAttribute('alt' , movie.title);
        posterImg.setAttribute('src' , 'https://image.tmdb.org/t/p/original' + movie.poster_path);
        tendCard.appendChild(posterImg);
        tends__preview.appendChild(tendCard);
        console.log(movie.poster_path);
    });
    
    console.log({data, movies});
    //console.log(sinopsis);
}

async function getCategories() {
    const res = await fetch(`http://api.themoviedb.org/3//genre/movie/list?api_key=${API_KEY}&language=es`);
    const data = await res.json();
    const genres = data.genres;
    categories.innerHTML = "";
    genres.forEach(gen => {
        const cat = document.createElement('div');
        cat.className = 'category__slot';
        const catText = document.createTextNode(gen.name);
        cat.appendChild(catText);
        categories.appendChild(cat);
        
    });
    



}


