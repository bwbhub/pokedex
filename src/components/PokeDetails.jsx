import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"

const PokeDetails = ({ pokeId, pokeInfo }) => {
  const [pokeDetails, setPokeDetails] = useState([])

  useEffect(() => {
    const getDetails = async (pokeId) => {
      const { response, err } = await pokeApi.getDetails({ pokeId: pokeId })

      if (response) {
        console.log(response)
        setPokeDetails(response)
      } else {
        console.error(err)
      }
    }
    getDetails(pokeId)
  }, [setPokeDetails, pokeId])

  return <div>PokeDetails</div>
}

export default PokeDetails
