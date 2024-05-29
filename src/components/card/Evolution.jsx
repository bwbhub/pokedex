import React, { useEffect, useState } from "react"
import pokeApi from "../../api/modules/pokedex.api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Evolution = ({ pokeInfo, pokeDetails, imgUrl }) => {
  const url = pokeDetails?.evolution_chain?.url
  const parts = url.split("/")
  const chainId = parts[parts.length - 2]

  const [evolDetails, setEvolDetails] = useState(null)
  const [preImg, setPreImg] = useState(null)
  const [preName, setPreName] = useState(null)
  const [nextImg, setNextImg] = useState(null)
  const [nextName, setNextName] = useState(null)

  const nameOfFirst = evolDetails?.species?.name
  const nameOfNext = evolDetails?.evolves_to[0]?.species.name

  useEffect(() => {
    const getDetails = async (chainId) => {
      const { response, err } = await pokeApi.getEvol({ chainId: chainId })

      if (response) {
        const evolChain = response.chain
        console.log(evolChain)
        setEvolDetails(evolChain)
      } else {
        console.error(err)
      }
    }
    const getNextDetails = async (nameOfNext) => {
      const { response, err } = await pokeApi.getPoke({ pokeId: nameOfNext })

      if (response) {
        setNextImg(
          response?.sprites?.other?.["official-artwork"]?.front_default
        )
        setNextName(response.name)
      } else {
        console.error(err)
      }
    }
    const getPreDetails = async (nameOfFirst) => {
      const { response, err } = await pokeApi.getPoke({ pokeId: nameOfFirst })

      if (response) {
        setPreImg(response?.sprites?.other?.["official-artwork"]?.front_default)
        setPreName(response.name)
      } else {
        console.error(err)
      }
    }
    getDetails(chainId)
    getPreDetails(nameOfFirst)
    getNextDetails(nameOfNext)
  }, [setEvolDetails, chainId])

  return (
    <div
      id="evolution"
      className="h-full w-full bg-white rounded-3xl flex gap-3 px-3 py-4 justify-center items-center"
    >
      <div className="w-1/5 flex flex-col items-center">
        <img
          src={preImg}
          alt={preName}
          className="w-full saturate-150 brightness-105"
        />
        <p className="capitalize text-sm font-semibold">{preName}</p>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />

      <div className="w-1/5 flex flex-col items-center">
        <img
          src={imgUrl}
          alt={pokeInfo.name}
          className="w-full saturate-150 brightness-105"
        />
        <p className="capitalize text-sm font-semibold">{pokeInfo.name}</p>
      </div>

      <FontAwesomeIcon icon={faArrowRight} />

      <div className="w-1/5  flex flex-col items-center">
        <img
          src={nextImg}
          alt={nextName}
          className="w-full saturate-150 brightness-105"
        />
        <p className="capitalize text-sm font-semibold">{nextName}</p>
      </div>
    </div>
  )
}

export default Evolution
