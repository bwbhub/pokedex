import React, { useState, useEffect } from "react"
import Stats from "./Stats"
import Evolution from "./Evolution"
import About from "./About"
import { useDispatch } from "react-redux"
import { setLocalLoading } from "../../redux/features/localLoadingSlice"

const BotCard = ({ selectedPokeInfos, pokeDetails, color }) => {
  const [activeComp, setActiveComp] = useState("about")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const modalComponent = () => {
    switch (activeComp) {
      case "about":
        return (
          <About
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
            loading={loading}
            color={color}
          />
        )
      case "stats":
        return (
          <Stats
            selectedPokeInfos={selectedPokeInfos}
            color={color}
            loading={loading}
          />
        )
      case "evolution":
        return (
          <Evolution
            pokeDetails={pokeDetails}
            color={color}
            loading={loading}
          />
        )
      default:
        return (
          <About
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
            loading={loading}
            color={color}
          />
        )
    }
  }

  useEffect(() => {
    setLoading(true)
    dispatch(setLocalLoading(true))

    const timer = setTimeout(() => {
      setLoading(false)
      dispatch(setLocalLoading(false))
    }, 1000)

    return () => clearTimeout(timer)
  }, [activeComp, dispatch])

  return (
    <div id="bot-panel" className="h-[400px] flex flex-col">
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
  )
}

export default BotCard
