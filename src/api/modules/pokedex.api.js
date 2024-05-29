import publicClient from "../client/public.client"

const pokedexEndpoints = {
  pokedex: "/pokedex",
  pokeList: "/pokemon",
  pokemon: ({ pokeId }) => `pokemon/${pokeId}`,
  langue: "/language",
  species: ({ pokeId }) => `/pokemon-species/${pokeId}`,
  evolution: ({ chainId }) => `/evolution-chain/${chainId}`
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
  },
  getEvol: async ({ chainId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.evolution({ chainId })
      )
      return { response }
    } catch (err) {
      return { err }
    }
  }
}

export default pokeApi
