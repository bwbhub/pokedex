import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import { bgColors } from "../utils/color"
import Modal from "react-modal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import TopCard from "./card/TopCard"
import BotCard from "./card/BotCard"

Modal.setAppElement("#root")

const PokeDetails = ({ closeModal, selectedPokeInfos }) => {
  const [pokeDetails, setPokeDetails] = useState([])

  const imgUrl =
    selectedPokeInfos?.sprites?.other?.["official-artwork"]?.front_default
  const mainType = selectedPokeInfos?.types[0].type.name
  const color = bgColors[mainType]
  const id = selectedPokeInfos?.id

  useEffect(() => {
    const getDetails = async (id) => {
      const { response, err } = await pokeApi.getDetails({ pokeId: id })

      if (response) {
        setPokeDetails(response)
      } else {
        console.error(err)
      }
    }
    getDetails(id)
  }, [])

  return (
    <div
      className="relative w-full h-[600px]"
      style={{
        backgroundColor: color
      }}
    >
      <FontAwesomeIcon
        icon={faClose}
        className="absolute right-4 top-4 z-10 cursor-pointer"
        onClick={closeModal}
      />
      <TopCard pokeInfo={selectedPokeInfos} color={color} imgUrl={imgUrl} />
      <BotCard
        selectedPokeInfos={selectedPokeInfos}
        pokeDetails={pokeDetails}
        color={color}
        imgUrl={imgUrl}
      />
    </div>
  )
}

export default PokeDetails
