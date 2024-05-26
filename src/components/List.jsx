import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import ListCard from "./ListCard"

const List = () => {
  const [pokeList, setPokeList] = useState([])

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await pokeApi.getAll()

      if (response) {
        const data = response.results
        setPokeList(data)
      } else {
        console.error(err)
      }
    }
    getList()
  }, [setPokeList])

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
      {pokeList.map((poke, idx) => (
        <ListCard poke={poke} key={idx} />
      ))}
    </div>
  )
}

export default List
