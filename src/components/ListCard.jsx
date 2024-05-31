import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import pokeball from "../assets/pokeball.png"
import dots from "../assets/dot.svg"
import { bgColors, textColors, hexToRgba } from "../utils/color"
import { typeListSvg } from "../utils/svgs"
import { urlConvert, formatId } from "../utils/textConvert"

const ListCard = ({ poke, openModal }) => {
  const [pokeInfo, setPokeInfo] = useState(null)

  const id = urlConvert(poke)
  const formatedId = formatId(id)

  const imgUrl = pokeInfo?.sprites?.other?.["official-artwork"]?.front_default
  const mainType = pokeInfo?.types[0].type.name
  const color = bgColors[mainType]

  useEffect(() => {
    const getPoke = async () => {
      const { response, err } = await pokeApi.getPoke({ pokeId: id })

      if (response) {
        setPokeInfo(response)
      } else {
        console.error(err)
      }
    }
    getPoke(id)
  }, [])

  const handleOpenModal = () => {
    openModal(pokeInfo)
  }

  return (
    <div
      className={`card-poke flex flex-col p-5 w-[27%] relative rounded-lg text-gray-100 font-semibold h-32 cursor-pointer`}
      style={{
        backgroundColor: color,
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0.05) 10%, rgba(0,0,0,0.1) 100%",
        transition: "transform 0.3s ease-in-out"
      }}
      onClick={handleOpenModal}
    >
      <div className="absolute overflow-hidden h-full w-full top-0 left-0 rounded-lg opacity-30">
        <img
          src={pokeball}
          alt="Pokeball"
          className="absolute h-[13rem] overflow-hidden -right-14 -top-9"
        />
        <span
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${hexToRgba(color, 1)} 10%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: "none"
          }}
        />
      </div>
      <div className="absolute overflow-hidden h-full w-full top-0 left-0 z-0 rounded-lg opacity-15">
        <img
          src={dots}
          alt="dots"
          className="absolute h-[4rem] overflow-hidden left-12 -top-[18px]"
        />
        <span
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${hexToRgba(color, 1)} 60%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: "none"
          }}
        />
      </div>
      <div>
        <div className="text-xs font-medium">{formatedId}</div>
        <h2 className="first-letter:capitalize text-[26px] font-bold">
          {pokeInfo?.name}
        </h2>
      </div>
      <div className="img-poke absolute w-[45%] right-0 -top-5 z-100 transition ease-in-out duration-500 saturate-150 brightness-105">
        <img src={imgUrl} alt={pokeInfo?.name} className="w-full" />
      </div>

      <div className="flex gap-3">
        {pokeInfo?.types?.map((type, idx) => (
          <div
            key={type + idx}
            className={`text-xs font-normal p-[5px] rounded flex gap-1 justify-center items-center`}
            style={{ backgroundColor: textColors[type?.type?.name] }}
          >
            <img
              src={typeListSvg[type?.type?.name]}
              alt={`${type?.type?.name}`}
              className=" w-4"
            />
            <p className="first-letter:capitalize">{type?.type?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListCard
