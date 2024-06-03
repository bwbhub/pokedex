import React, { useState, useEffect } from "react"
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons"
import Modal from "react-modal"
import { textColors } from "../utils/color"
import { typeListSvg, typeList } from "../utils/svgs"
import pokeApi from "../api/modules/pokedex.api"

const modalStyle = {
  content: {
    top: "auto",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "300px",
    borderTopLeftRadius: "32px",
    borderTopRightRadius: "32px",
    padding: 0,
    border: "0",
    backgroundColor: "#363636",
    zIndex: 100
  },
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    zIndex: 100
  }
}

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [genList, setGenList] = useState([])

  useEffect(() => {
    const getGen = async () => {
      const { response, err } = await pokeApi.getGen()

      if (response) {
        setGenList(response.results)
        console.log(response.results)
      } else {
        console.error(err)
      }
    }

    getGen()
  }, [])

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <header className="flex gap-4 items-center text-[#ACACAC]">
      <img src={logo} alt="pokedex" className=" w-60" />
      <div className="border-2 border-[#ACACAC] rounded-lg p-3 w-96 flex  items-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
        <input
          type="text"
          placeholder={"Search a specific Pokémon !"}
          className="bg-transparent ml-3 w-full outline-none"
        />
      </div>
      <div>
        <FontAwesomeIcon
          icon={faSliders}
          className="text-xl cursor-pointer"
          onClick={openModal}
        />
      </div>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyle}>
        <div className="text-white flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Filters</h2>
          <div className="w-3/4">
            <h3 className="text-xl font-semibold mb-3">Types: </h3>
            <div className="flex flex-row gap-2 flex-wrap">
              {typeList.map((type) => (
                <div
                  key={type}
                  style={{ backgroundColor: textColors[type] }}
                  className="p-1 rounded flex gap-1 cursor-pointer"
                >
                  <img src={typeListSvg[type]} alt={type} className=" w-4" />
                  <p className="capitalize font-semibold text-sm">{type}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4">
            <h3 className="text-xl font-semibold mb-3">Generation: </h3>
            <div className="flex flex-row gap-2 flex-wrap">
              {genList.map((gen) => (
                <div
                  key={gen.name}
                  className="p-1 rounded flex gap-1 cursor-pointer"
                >
                  <p className="capitalize font-semibold text-sm">{gen.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </header>
  )
}

export default Header
