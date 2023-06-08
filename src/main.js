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
    
    // console.log({data, movies});
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
        cat.addEventListener('click', () => {
            location.hash=`#category=${gen.id}-${gen.name}`;
            header__catTitle.innerHTML=gen.name;
            getMovieByCategory(gen.id);
        })
        cat.appendChild(catText);
        categories.appendChild(cat);
        
        
    });
    



}

async function getMovieByCategory(id) {
    const res = await fetch(`http://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${API_KEY}&language=es`);
    const data = await res.json();

    const movies = data.results;
    filterCat.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        const posterImg = document.createElement('img');
        const titleMovie = document.createElement('h1');
        movieCard.classList.add('filterCat__movieCard');
        posterImg.setAttribute('alt' , movie.title);
        posterImg.setAttribute('src' , 'https://image.tmdb.org/t/p/original' + movie.poster_path);
        titleMovie.innerHTML = movie.title;
        movieCard.appendChild(posterImg);
        movieCard.appendChild(titleMovie);
        filterCat.appendChild(movieCard);
    });

}

async function getMoviesBySearch(query) {
    // const res = await fetch(`http://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${API_KEY}&language=es`);
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=es`);
    const data = await res.json();

    const movies = data.results;
    finder.innerHTML = "";

    movies.forEach(movie => {
        const finder__result = document.createElement('div');
        const finder__poster = document.createElement('div');
        const poster = document.createElement('img');
        const finder__info = document.createElement('div');
        const finder__title = document.createElement('h1');
        const finder__date = document.createElement('h3');

        finder__result.classList.add('finder__result');
        finder__poster.classList.add('finder__poster');
        poster.classList.add('description__img');

        poster.setAttribute('alt' , movie.title);
        poster.setAttribute('src' , 'https://image.tmdb.org/t/p/original' + movie.poster_path);

        finder__info.classList.add('finder__info');
        finder__title.classList.add('finder__title');
        finder__date.classList.add('finder__date');
        finder__title.innerHTML = movie.title;
        finder__date.innerHTML = movie.release_date;

        finder__poster.appendChild(poster);
        finder__info.appendChild(finder__title);
        finder__info.appendChild(finder__date);

        finder__result.appendChild(finder__poster);
        finder__result.appendChild(finder__info);
        finder.appendChild(finder__result);
    });

}

header__btnFind.addEventListener('click' , () => {
    location.hash = '#search=' + header__input.value;

})
