async function getTrendingMoviesPreview() {
    const res = await fetch('http://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    const sinopsis = data.results[0].overview;
    
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


