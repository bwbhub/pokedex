import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import pokeball from "../assets/pokeball.png"
import { bgColors, textColors } from "../utils/color"
import { typeListSvg } from "../utils/svgs"
import Modal from "react-modal"

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "65%",
    borderRadius: "25px",
    padding: 0
  }
}

const PokeDetails = ({
  pokeId,
  pokeInfo,
  isOpen,
  setIsOpen,
  imgUrl,
  formatedId
}) => {
  const [pokeDetails, setPokeDetails] = useState([])
  const mainType = pokeInfo?.types[0].type.name

  const closeModal = () => {
    setIsOpen(false)
  }

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

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
      <div
        id="top-panel"
        className="w-full h-1/3 flex overflow-hidden flex-row items-center text-white relative"
        style={{
          backgroundColor: bgColors[mainType]
        }}
      >
        <div className="absolute -top-4">
          <p
            className="bg-title relative text-9xl uppercase top-1 font-bold"
            style={{
              color: bgColors[mainType]
            }}
          >
            {pokeInfo.name}
          </p>
          <span
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to top, rgba(204, 104, 10, 1) 10%, rgba(204, 104, 10, 0) 100%)`,
              pointerEvents: "none"
            }}
          />
        </div>
        <div className="absolute w-1/3 left-10 bottom-0 opacity-30">
          <img src={pokeball} alt="Pokeball" className="relative" />
          <span
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, rgba(204, 104, 10, 1) 30%, rgba(204, 104, 10, 0) 100%)`,
              pointerEvents: "none"
            }}
          />
        </div>
        <div className="w-1/2 h-full relative flex justify-center items-center">
          <img
            src={imgUrl}
            alt={pokeInfo.name}
            className="w-4/6 z-100 saturate-150 brightness-105"
          />
        </div>
        <div className="w-1/2 h-full relative flex flex-col justify-center px-5 font-bold">
          <p>{formatedId}</p>
          <h2 className="first-letter:capitalize text-[26px]">
            {pokeInfo.name}
          </h2>
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
        </div>
      </div>
      <div id="bot-panel"></div>
    </Modal>
  )
}

export default PokeDetails
