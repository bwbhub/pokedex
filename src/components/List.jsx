import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import ListCard from "./ListCard"
import Modal from "react-modal"
import PokeDetails from "./PokeDetails"

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
    border: "0px"
  }
}

const List = () => {
  const [pokeList, setPokeList] = useState([])
  const [selectedPokeInfos, setSelectedPokeDetails] = useState(null)
  const [pokeInfoList, setPokeInfoList] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (details) => {
    setSelectedPokeDetails(details)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

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
  }, [])

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
      {pokeList.map((poke, idx) => (
        <ListCard
          poke={poke}
          key={idx}
          openModal={openModal}
          pokeInfoList={pokeInfoList}
          setPokeInfoList={setPokeInfoList}
        />
      ))}
      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyle}>
        <PokeDetails
          closeModal={closeModal}
          selectedPokeInfos={selectedPokeInfos}
        />
      </Modal>
    </div>
  )
}

export default List
