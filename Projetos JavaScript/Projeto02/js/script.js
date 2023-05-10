const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const ButtonPrev = document.querySelector('.btn-prev');
const ButtonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status===200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading..';

    const data = await fetchPokemon(pokemon);

    if (data){
    pokemonImage.style.display = 'block;'    
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data [`sprites`][`versions`][`generation-v`][`black-white`][`animated`][`front_default`];
    input.value = '';
    } else {
        pokemonImage.style.display = 'none;'
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit',(event) => {
    event.preventDefault();
    renderPokemon(input.value);
});

ButtonPrev.addEventListener('click',() => {
    searchPokemon -=1;
    renderPokemon(searchPokemon);
});

ButtonNext.addEventListener('click',() => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
    