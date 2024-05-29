import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import pokeball from "../assets/pokeball.png"
import { bgColors, textColors, hexToRgba } from "../utils/color"
import { typeListSvg } from "../utils/svgs"
import Modal from "react-modal"
import About from "./card/About"
import Evolution from "./card/Evolution"
import Stats from "./card/Stats"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

const PokeDetails = ({
  pokeId,
  pokeInfo,
  imgUrl,
  formatedId,
  modalOpen,
  handleClose
}) => {
  const [pokeDetails, setPokeDetails] = useState([])
  const [activeComp, setActiveComp] = useState("about")

  const mainType = pokeInfo?.types[0].type.name
  const color = bgColors[mainType]

  const modalComponent = () => {
    switch (activeComp) {
      case "about":
        return <About pokeDetails={pokeDetails} pokeInfo={pokeInfo} />
      case "stats":
        return <Stats pokeInfo={pokeInfo} color={color} />
      case "evolution":
        return (
          <Evolution
            pokeInfo={pokeInfo}
            pokeDetails={pokeDetails}
            imgUrl={imgUrl}
          />
        )
      default:
        return <About pokeDetails={pokeDetails} pokeInfo={pokeInfo} />
    }
  }

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      height: "600px",
      borderRadius: "24px",
      padding: 0,
      border: "0px",
      backgroundColor: color
    }
  }

  useEffect(() => {
    if (modalOpen) {
      const getDetails = async (pokeId) => {
        const { response, err } = await pokeApi.getDetails({ pokeId: pokeId })

        if (response) {
          setPokeDetails(response)
        } else {
          console.error(err)
        }
      }
      getDetails(pokeId)
    } else {
      return
    }
  }, [setPokeDetails, pokeId, modalOpen])

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleClose}
      style={modalStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <div
        id="top-panel"
        className="w-full h-[175px] flex overflow-hidden flex-row items-center text-white relative"
      >
        <FontAwesomeIcon
          icon={faClose}
          className="absolute right-4 top-4 z-10 cursor-pointer"
          onClick={handleClose}
        />
        <div className="absolute -top-4">
          <p
            className="bg-title relative text-9xl uppercase top-1 font-bold"
            style={{
              color: color
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
              background: `linear-gradient(to top, ${hexToRgba(color, 1)} 10%, ${hexToRgba(color, 0)} 100%)`,
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
              background: `linear-gradient(to bottom, ${hexToRgba(color, 1.5)} 40%, ${hexToRgba(color, 0)} 100%)`,
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
      <div id="bot-panel" className="h-[425px] flex flex-col">
        <div className=" h-8">
          <ul className="flex flex-row justify-around capitalize text-white">
            <li
              className={`cursor-pointer ${activeComp === "about" ? "font-bold" : null}`}
              onClick={() => setActiveComp("about")}
            >
              about
            </li>
            <li
              className={`cursor-pointer ${activeComp === "stats" ? "font-bold" : null}`}
              onClick={() => setActiveComp("stats")}
            >
              stats
            </li>
            <li
              className={`cursor-pointer ${activeComp === "evolution" ? "font-bold" : null}`}
              onClick={() => setActiveComp("evolution")}
            >
              evolution
            </li>
          </ul>
        </div>
        {modalComponent()}
      </div>
    </Modal>
  )
}

export default PokeDetails
