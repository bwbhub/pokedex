import React, { useState, useEffect } from "react"
import pokeApi from "../api/modules/pokedex.api"
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons"
import Modal from "react-modal"
import TypeFilter from "./filters/TypeFilter"
import RegionFilter from "./filters/RegionFilter"

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

const Header = ({ openModal }) => {
  const [modalFilterOpen, setModalFilterOpen] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [query, setQuery] = useState("")

  const onQueryChange = (e) => {
    setQuery(e.target.value)
  }
  const openFilterModal = () => {
    setModalFilterOpen(true)
  }
  const closeFilterModal = () => {
    setModalFilterOpen(false)
  }

  const inputValue = query

  const getSearchDetails = async (e) => {
    const id = e.target.innerHTML

    const { response, err } = await pokeApi.getPoke({ pokeId: id })

    if (response) {
      openModal(response)
      setQuery("")
    } else {
      console.error(err)
    }
  }

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await pokeApi.getAll()

      if (response) {
        setSearchList(response.results)
      } else {
        console.err(err)
      }
    }
    getList()
  }, [])

  return (
    <header className="flex gap-4 items-center text-[#ACACAC]">
      <img src={logo} alt="pokedex" className=" w-60" />
      <div className="relative">
        <div className="border-2 border-[#ACACAC] rounded-lg p-3 w-96 flex relative items-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
          <input
            type="text"
            name="search"
            value={inputValue}
            placeholder={"Search a specific Pokémon !"}
            className="bg-transparent ml-3 w-full outline-none"
            onChange={(e) => onQueryChange(e)}
          />
        </div>
        <div>
          {query.length > 0 && (
            <div className="w-full max-w-96 bg-[#2b2b2b] p-2 absolute z-20 rounded-b-lg">
              {searchList.map((poke, idx) =>
                poke?.name?.includes(query) ? (
                  <p
                    key={idx}
                    className="capitalize cursor-pointer py-1 px-2 hover:font-semibold"
                    onClick={(e) => getSearchDetails(e)}
                  >
                    {poke.name}
                  </p>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <FontAwesomeIcon
          icon={faSliders}
          className="text-xl cursor-pointer"
          onClick={openFilterModal}
        />
      </div>
      <Modal
        isOpen={modalFilterOpen}
        onRequestClose={closeFilterModal}
        style={modalStyle}
      >
        <div className="text-white flex flex-col justify-center items-center">
          <h2 className="mt-3 text-2xl font-bold">Filters</h2>
          <TypeFilter closeFilterModal={closeFilterModal} />
          <RegionFilter closeFilterModal={closeFilterModal} />
        </div>
      </Modal>
    </header>
  )
}

export default Header
