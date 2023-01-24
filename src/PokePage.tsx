import { useEffect, useState } from "react"
import { PokeCard } from "./PokeCard"
import { getAllPokemon, getPokemon } from "./services/pokeapi.service"
import { useQuery, useQueryClient, useQueries } from "react-query"

export const PokePage = () => {
  const [page, setPage] = useState(0)
  const [pokePerPage] = useState(4)

  // ==============
  // React Query
  // ==============

  // Access the client
  const queryCli = useQueryClient()

  // Queries
  const pokemonListQuery = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => getAllPokemon(page * pokePerPage),
    keepPreviousData: true,
    staleTime: 10000,
  })

  const pokemonQueries = useQueries(
    pokemonListQuery.data?.map((pokemon) => ({
      queryKey: ["pokemon", pokemon.url],
      queryFn: () => getPokemon(pokemon.url),
      staleTime: 10000,
    })) || []
  )

  // Prefetch next page
  useEffect(() => {
    if (!pokemonListQuery.isPreviousData) {
      queryCli.prefetchQuery(["pokemonList", page + 1], () =>
        getAllPokemon((page + 1) * pokePerPage)
      )
    }
  }, [pokemonListQuery.isPreviousData, page, queryCli, pokePerPage])
  return (
    <main className="container">
      <h1>PokeApp using React Query</h1>
      <div aria-busy={pokemonListQuery.isLoading}>
        <div className="grid">
          {page > 0 ? (
            <button className="contrast" onClick={() => setPage((p) => p - 1)}>
              Back
            </button>
          ) : (
            <button className="contrast"></button>
          )}
          <button className="secondary">Page {page + 1}</button>
          <button className="contrast" onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
        <div className="grid">
          {pokemonQueries.slice(0, 4).map((poke) => {
            return <PokeCard pokemon={poke?.data} loading={poke.isLoading} />
          })}
        </div>
      </div>
    </main>
  )
}
