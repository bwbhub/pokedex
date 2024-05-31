import React, { useState } from "react"
import Stats from "./Stats"
import Evolution from "./Evolution"
import About from "./About"

const BotCard = ({ selectedPokeInfos, pokeDetails, color, imgUrl }) => {
  const [activeComp, setActiveComp] = useState("about")

  const modalComponent = () => {
    switch (activeComp) {
      case "about":
        return (
          <About
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
          />
        )
      case "stats":
        return <Stats selectedPokeInfos={selectedPokeInfos} color={color} />
      case "evolution":
        return (
          <Evolution
            selectedPokeInfos={selectedPokeInfos}
            pokeDetails={pokeDetails}
            imgUrl={imgUrl}
          />
        )
      default:
        return (
          <About
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
          />
        )
    }
  }

  return (
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
  )
}

export default BotCard
