import publicClient from "../client/public.client"

const pokedexEndpoints = {
  pokedex: "/pokedex",
  pokeList: "/pokemon",
  pokemon: ({ pokeId }) => `pokemon/${pokeId}`,
  generation: "/generation",
  langue: "/language",
  color: "/pokemon-color",
  version: "/version",
  species: ({ pokeId }) => `/pokemon-species/${pokeId}`
}

const pokeApi = {
  getAll: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.pokeList)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getLanguage: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.langue)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getPoke: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.pokemon({ pokeId })
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getDetails: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.species({ pokeId })
      )

      return { response }
    } catch (err) {
      return { err }
    }
  }
}

export default pokeApi
