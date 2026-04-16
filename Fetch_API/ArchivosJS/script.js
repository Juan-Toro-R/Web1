const apiUrl = "https://pokeapi.co/api/v2/";
const pokemonContainer = document.getElementById("pokemons");


async function pokemonQuery(id) {
    try {
        const response = await fetch(apiUrl + "pokemon/" + id);
        const pokemon = await response.json();
        
        
        const template = `
        <div class="card" style="width: 18rem;">
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                <p class="card-text">Altura: ${pokemon.height} <br> Peso: ${pokemon.weight}</p>
                <a href="#" class="btn btn-primary">Ver detalles</a>
            </div>
        </div>
        `;
        
        
        pokemonContainer.innerHTML += template;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}



pokemonQuery(1);  
pokemonQuery(2);
pokemonQuery(3);
pokemonQuery(4);
pokemonQuery(5);
pokemonQuery(6);
pokemonQuery(7);
pokemonQuery(8);
pokemonQuery(9);