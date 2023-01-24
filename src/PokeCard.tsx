import { IPokemon } from "./interfaces"

export const PokeCard = ({
  pokemon,
  loading,
}: {
  pokemon?: IPokemon
  loading?: boolean
}) => {
  return (
    <article aria-busy={loading}>
      {pokemon && (
        <>
          <img src={pokemon.image} alt={pokemon.name} />
          <h4>{pokemon.name}</h4>
        </>
      )}
    </article>
  )
}
