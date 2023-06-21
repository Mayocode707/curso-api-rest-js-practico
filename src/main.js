async function getTrendingMoviesPreview() {
    const res = await fetch('http://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    const sinopsis = data.results[0].overview;
    tends__preview.innerHTML = "";
    tends__title__txt.innerHTML = 'Tendencias';

    movies.forEach(movie => {
        
        const tendCard = document.createElement('div');
        const posterImg = document.createElement('img');
        tendCard.classList.add('tends__card');
        posterImg.setAttribute('alt' , movie.title);
        posterImg.setAttribute('src' , 'https://image.tmdb.org/t/p/original' + movie.poster_path);
        tendCard.appendChild(posterImg);
        tends__preview.appendChild(tendCard);
        console.log(movie.poster_path);
        tendCard.addEventListener('click', () => {
            location.hash = `#details=${movie.id}`;
        });
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
    console.log(movies);
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
        movieCard.addEventListener('click', () => {
            location.hash = `#details=${movie.id}`;
        })
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

async function getMovieById(id){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es`);
    const data = await res.json();
    const moviesGen = data.genres;
    console.log(data);
    console.log(moviesGen);
    description__tagsContainer.innerHTML = '';
    description__img.setAttribute('src' , '');


    // const description__title = document.createElement('h1');
    // description__title.classList.add('description__title');
    // const description__rate = document.createElement('dic');
    // description__rate.classList.add('description__rate');


    description__title.innerHTML = data.title;
    description__rate.innerHTML = data.vote_average.toFixed(1);
    description__summary.innerHTML = data.overview;
    description__img.setAttribute('src' , 'https://image.tmdb.org/t/p/original' + data.poster_path);


    moviesGen.forEach(movieGen => {
        const description__tag = document.createElement('div');
        description__tag.classList.add('description__tag');
        description__tag.innerHTML = movieGen.name;
        description__tag.addEventListener('click', () => {
            location.hash=`#category=${movieGen.id}-${movieGen.name}`;
            header__catTitle.innerHTML = movieGen.name;
            getMovieByCategory(movieGen.id);
        })
        description__tagsContainer.appendChild(description__tag);


    })

    getRelatedMovieID(id);
}

async function getRelatedMovieID(id){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=es`);
    const data = await res.json();
    const relatedMovies = data.results;

    tends__preview.innerHTML = "";
    tends__title__txt.innerHTML = 'Películas Relacionadas';

    relatedMovies.forEach(movie => {
        
        const tendCard = document.createElement('div');
        const posterImg = document.createElement('img');
        tendCard.classList.add('tends__card');
        posterImg.setAttribute('alt' , movie.title);
        posterImg.setAttribute('src' , 'https://image.tmdb.org/t/p/original' + movie.poster_path);
        tendCard.appendChild(posterImg);
        tends__preview.appendChild(tendCard);
        console.log(movie.poster_path);
        tendCard.addEventListener('click', () => {
            location.hash = `#details=${movie.id}`;
        });
    });
}

header__btnFind.addEventListener('click' , () => {
    location.hash = '#search=' + header__input.value;

})


document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        location.hash = '#search=' + header__input.value;
    }
});
