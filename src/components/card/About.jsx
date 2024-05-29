import React from "react"
import { capitalizeUppercase, formatDesc } from "../../utils/textConvert"

const About = ({ pokeInfo, pokeDetails }) => {
  const rawDesc = pokeDetails?.flavor_text_entries?.[2]?.flavor_text
  const okDesc = formatDesc(rawDesc)
  const useableDesc = capitalizeUppercase(okDesc)

  return (
    <div
      id="about"
      className="h-full w-full bg-white rounded-3xl flex flex-col p-6"
    >
      <p className="w-full text-lg mb-4">{useableDesc}</p>
      <h3 className="mb-1 font-bold">Pokémon's data</h3>
      <div className="flex mb-4 gap-4">
        <ul>
          <li>Height:</li>
          <li>Weight:</li>
        </ul>
        <div>
          <ul>
            <li>{pokeInfo?.height / 10 + "m"}</li>
            <li>
              {pokeInfo?.weight / 10 +
                "kg (" +
                ((pokeInfo?.weight / 10) * 2.204).toFixed(1) +
                "lbs)"}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex gap-4">
        <ul>
          <li>Capture Rate:</li>
          <li>Base Happiness:</li>
          <li>Base Exp:</li>
          <li>Growth Rate:</li>
        </ul>
        <ul>
          <li>{pokeDetails?.capture_rate} / 255</li>
          <li>{pokeDetails?.base_happiness} / 255</li>
          <li>{pokeInfo?.base_experience}</li>
          <li>{pokeDetails?.growth_rate?.name}</li>
        </ul>
      </div>
    </div>
  )
}

export default About
