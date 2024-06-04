import "./App.css"
import Header from "./components/Header"
import List from "./components/List"
import PokeSvg from "./components/PokeSvg"
import { useState } from "react"

function App() {
  const loading = true
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPokeInfos, setSelectedPokeDetails] = useState(null)

  const openModal = (details) => {
    setSelectedPokeDetails(details)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="flex flex-col justify-center items-center my-8 max-w-7xl relative">
      <PokeSvg loading={loading} />
      <Header openModal={openModal} />

      <List
        openModal={openModal}
        modalOpen={modalOpen}
        closeModal={closeModal}
        selectedPokeInfos={selectedPokeInfos}
      />
    </div>
  )
}

export default App
