import axios from "axios"
import { IPokemon, IPokemonList } from "../interfaces"

const https = axios.create({ baseURL: "https://pokeapi.co/api/v2" })

export const getAllPokemon = async (offset = 0): Promise<IPokemonList[]> => {
  try {
    const pokemonList = await https.get(`/pokemon`, {
      params: {
        limit: 4,
        offset,
      },
    })

    return pokemonList.data.results
  } catch (e) {
    console.log(e)
    return Promise.reject()
  }
}

export const getPokemon = async (url: string): Promise<IPokemon> => {
  const pokemon = await axios.get(url)

  return mapPokemon(pokemon.data)
}

export const mapPokemon = (pokemon: any): IPokemon => {
  const {
    name,
    sprites: {
      other: {
        "official-artwork": { front_default: image },
      },
    },
  } = pokemon

  return { name, image }
}
