import React, { useEffect, useState } from "react"
import pokeApi from "../api/modules/pokedex.api"
import ListCard from "./ListCard"
import Modal from "react-modal"
import PokeDetails from "./PokeDetails"
import { useDispatch } from "react-redux"
import { setGlobalLoading } from "../redux/features/globalLoadingSlice"

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    height: "700px",
    borderRadius: "24px",
    padding: 0,
    border: "0",
    backgroundColor: "#363636"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.5)"
  }
}

const List = () => {
  const [pokeList, setPokeList] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPokeInfos, setSelectedPokeDetails] = useState(null)
  const [pokeInfoList, setPokeInfoList] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useDispatch()

  const openModal = (details) => {
    setSelectedPokeDetails(details)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  const ITEMS_PER_PAGE = 30

  const uniquePokeList = new Map()

  const getList = async (page) => {
    const { response, err } = await pokeApi.getAll()

    if (response) {
      const data = response.results
      const startIndex = (page - 1) * ITEMS_PER_PAGE
      const endIndex = page * ITEMS_PER_PAGE
      const newItems = data.slice(startIndex, endIndex)

      setPokeList((prevList) => {
        const uniqueItems = new Map(prevList.map((item) => [item.name, item]))
        newItems.forEach((item) => uniqueItems.set(item.name, item))
        return Array.from(uniqueItems.values())
      })
    } else {
      console.error(err)
    }
  }

  useEffect(() => {
    const loadInitialList = async () => {
      if (initialLoading) {
        dispatch(setGlobalLoading(true))
        await getList(currentPage)
        dispatch(setGlobalLoading(false))
        setInitialLoading(false)
      }
    }

    loadInitialList()
  }, [])

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !modalOpen
      ) {
        const nextPage = currentPage + 1
        await getList(nextPage)
        setCurrentPage(nextPage)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [currentPage, modalOpen])

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
      {pokeList.map((poke, idx) => (
        <ListCard
          poke={poke}
          key={idx}
          openModal={openModal}
          pokeInfoList={pokeInfoList}
          setPokeInfoList={setPokeInfoList}
          modalOpen={modalOpen}
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
