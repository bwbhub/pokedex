import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import pokeball from "../assets/pokeball.png"
import { bgColors, textColors } from "../utils/color"
import { typeListSvg } from "../utils/svgs"
import Modal from "react-modal"
import PokeDetails from "./PokeDetails"

const ListCard = ({ poke }) => {
  const [pokeInfo, setPokeInfo] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const url = poke.url
  const parts = url.split("/")
  const id = parts[parts.length - 2]
  const formattedId = `#${String(id).padStart(4, "0")}`

  const imgUrl = pokeInfo?.sprites?.other?.["official-artwork"]?.front_default
  const mainType = pokeInfo?.types[0].type.name

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await pokeApi.getPoke({ pokeId: id })

      if (response) {
        setPokeInfo(response)
      } else {
        console.error(err)
      }
    }
    getList(id)
  }, [id, setPokeInfo])

  return pokeInfo !== null ? (
    <div
      className={`card-poke flex flex-col p-5 w-[27%] relative rounded-md text-gray-100 font-semibold h-32`}
      style={{
        backgroundColor: bgColors[mainType],
        transition: "transform 0.3s ease-in-out"
      }}
      onClick={openModal}
    >
      <div className="absolute overflow-hidden h-full w-full top-0 left-0 opacity-20">
        <img
          src={pokeball}
          alt="Pokeball"
          className="absolute h-8rem overflow-hidden -top-16 left-32 "
        />
      </div>
      <div className="z-10">
        <div className="text-xs">{formattedId}</div>
        <h2 className="first-letter:capitalize text-[26px] font-bold">
          {pokeInfo.name}
        </h2>
      </div>
      <div className="img-poke absolute w-[45%] right-0 -top-5 z-100 transition ease-in-out duration-500 saturate-150 brightness-105">
        <img src={imgUrl} alt={pokeInfo.name} className="w-full" />
      </div>

      <div className="flex gap-3">
        {pokeInfo.types.map((type, idx) => (
          <div
            key={type + idx}
            className={`text-xs font-normal p-[5px] rounded flex gap-1 justify-center items-center`}
            style={{ backgroundColor: textColors[type.type.name] }}
          >
            <img
              src={typeListSvg[type.type.name]}
              alt={`${type.type.name}`}
              className=" w-4"
            />
            <p className="first-letter:capitalize">{type.type.name}</p>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen}>
        <PokeDetails pokeId={id} pokeInfo={pokeInfo} />
      </Modal>
    </div>
  ) : null
}

export default ListCard
