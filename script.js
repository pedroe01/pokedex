const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let buscaPoke = 1;



const getPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.innerHTML = '';

    const data = await getPokemon(pokemon);
    
    const sprite = data.sprites.versions['generation-v']['black-white'].animated
    ['front_default']

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = sprite ? sprite : data.sprites['front_default']
        buscaPoke = data.id
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = '';
})

buttonPrev.addEventListener('click', () => {
    if (buscaPoke > 1) {
        buscaPoke --
        renderPokemon(buscaPoke)
    }
})

buttonNext.addEventListener('click', () => {
    buscaPoke ++
    renderPokemon(buscaPoke)
})

renderPokemon(buscaPoke);
