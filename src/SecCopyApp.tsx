import { useEffect, useState } from "react"
import { IPokemon, IPokemonList } from "./interfaces"
import { PokeCard } from "./PokeCard"
import { getAllPokemon, getPokemon } from "./services/pokeapi.service"

function App() {
  const [pokeList, setPokemonList] = useState<IPokemonList[]>([])
  const [pokemon, setPokemon] = useState<IPokemon[]>([])
  const [page, setPage] = useState(1)

  // Call Poke API to get all
  useEffect(() => {
    getAllPokemon((page - 1) * 9).then((pokemonList) =>
      setPokemonList(pokemonList)
    )
  }, [page])

  // Call Poke API to get each pokemon
  useEffect(() => {
    if (pokeList.length > 0) {
      const promises = pokeList.map((poke) => getPokemon(poke.url))
      Promise.all(promises).then((pokemon) => setPokemon(pokemon))
    }
  }, [pokeList])

  return (
    <main className="container">
      <h1>PokeApp using React Query</h1>
      <div className="grid">
        {pokemon.slice(0, 3).map((poke) => (
          <PokeCard pokemon={poke} />
        ))}
      </div>
      <div className="grid">
        {pokemon.slice(3, 6).map((poke) => (
          <PokeCard pokemon={poke} />
        ))}
      </div>
      <div className="grid">
        {pokemon.slice(6, 9).map((poke) => (
          <PokeCard pokemon={poke} />
        ))}
      </div>
      <div className="grid">
        {page > 1 ? (
          <button className="contrast" onClick={() => setPage((p) => p - 1)}>
            Back
          </button>
        ) : (
          <button className="contrast"></button>
        )}
        <button className="secondary">Page {page}</button>
        <button className="contrast" onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </main>
  )
}

export default App
