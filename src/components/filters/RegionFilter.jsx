import React, { useState, useEffect } from "react"
import pokeApi from "../../api/modules/pokedex.api"
import { genAndRegion } from "../../utils/genAndRegion"

const RegionFilter = () => {
  const [genList, setGenList] = useState([])

  useEffect(() => {
    const getGen = async () => {
      const { response, err } = await pokeApi.getGen()

      if (response) {
        setGenList(response.results)
      } else {
        console.error(err)
      }
    }

    getGen()
  }, [])

  return (
    <div className="w-3/4 mt-4">
      <h3 className="text-xl font-semibold mb-3">Main Region: </h3>
      <div className="flex flex-row gap-2 flex-wrap">
        {genList.map((gen) => (
          <div
            key={gen.name}
            className="py-1 px-2 rounded-md flex gap-1 cursor-pointer border border-[#acacac]"
          >
            <p className="capitalize font-semibold text-md">
              {genAndRegion[gen.name]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegionFilter
