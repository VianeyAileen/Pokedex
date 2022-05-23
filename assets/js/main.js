// Get the root element
const containerElement = document.querySelector('.container')
const searchPokemon = document.querySelector('#pokemonInput')
const spinner = document.querySelector('#spin')
const selectType = document.querySelector('#type')
const initial = document.querySelector('#initial')
let pokemons = []

const main = () => {
    // fetch('https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json')
    fetch('api/character.json')
     .then(response =>response.json())
     .then(data => normalizeData(data))
     .then(pokemons => {
        let i = 0
         while (i < pokemons.length) {
             renderPokemons(pokemons[i])
             i++
             spinner.style.display = "none"
        }
    })
}

// Normalize the data
const normalizeData = (data) => {
    data.forEach(element => {
        const {ThumbnailImage, number, name, type, abilities, weight, height} = element
        const pokemon = {
            image: ThumbnailImage,
            number: number,
            name: name,
            type: type.join(', '),
            abilities: abilities,
            weight: weight,
            height: height
        }
        pokemons.push(pokemon)
    })
    return pokemons
}

// Show pokemons in the HTML
const renderPokemons = (element) => {
    // Create elements
    const card = document.createElement('div')
    const cardInner = document.createElement('div')
    const cardFront = document.createElement('div')
    const pNumber = document.createElement('p')
    const pName = document.createElement('p')
    const img = document.createElement('img')
    const cardBack = document.createElement('div')
    const h2 = document.createElement('h2')
    const pType = document.createElement('p')
    const pAbilities = document.createElement('p')
    const pWeight = document.createElement('p')
    const pHeight = document.createElement('p')

    // Asign class to the elements created previously
    card.classList.add('flip-card')
    cardInner.classList.add('flip-card-inner')
    cardFront.classList.add('flip-card-front')
    pNumber.classList.add('number')
    pNumber.innerHTML= '#' + element.number
    pName.innerHTML = element.name
    cardBack.classList.add('flip-card-back')
    h2.innerHTML = element.name
    pType.innerHTML = '<strong>Type:</strong> ' + element.type
    pAbilities.innerHTML = '<strong>Abilities:</strong> ' + element.abilities
    pWeight.innerHTML = '<strong>Weight:</strong> ' + element.weight
    pHeight.innerHTML = '<strong>Height:</strong> ' + element.height

    img.setAttribute('src', element.image)

    // Show the elements created on the HTML
    containerElement.appendChild(card)
    card.appendChild(cardInner)
    cardInner.appendChild(cardFront)
    cardFront.appendChild(img)
    cardFront.appendChild(pNumber)
    cardFront.appendChild(pName)
    cardInner.appendChild(cardBack)
    cardBack.appendChild(h2)
    cardBack.appendChild(pType)
    cardBack.appendChild(pAbilities)
    cardBack.appendChild(pWeight)
    cardBack.appendChild(pHeight)
}

// Find text matches
searchPokemon.addEventListener('keyup', (event) => {
    const inputText = event?.target?.value.toLocaleLowerCase() || ''
    cleanView()
    const pokemonsFiltered = filterPokemon(inputText)
    pokemonsFiltered.forEach(renderPokemons)
})

// Clean the view
const cleanView = () => {
    containerElement.innerHTML = ''
}

// Search using Filter
const filterPokemon = (searchingText) => {
    const pokemonsFiltered = pokemons.filter(pokemon => {
        const name = pokemon.name
        const number = pokemon.number
        return (name.toLocaleLowerCase()).includes(searchingText) || number.includes(searchingText)
    })
    return pokemonsFiltered
}

// Selectors
// Search by type
selectType.addEventListener('change', (event) => {
    const pokemonType = event?.target?.value || ''
    const newType = pokemons.filter((element) => {
        const pokemonT = (element.type).toLocaleLowerCase()
        return pokemonT.includes(pokemonType)
    })
    cleanView()
    newType.forEach(renderPokemons)
})

// Search by initial
initial.addEventListener('change', (event) => {
    const pokemonInitial = event?.target?.value || ''
    const newInitial = pokemons.filter((element) => {
        const pokemonI = element.name
        return pokemonI.startsWith(pokemonInitial)
    })
    cleanView()
    newInitial.forEach(renderPokemons)
})

main()