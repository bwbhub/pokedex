import React from "react"
import { capitalizeUppercase, formatDesc } from "../../utils/textConvert"
import LocalLoading from "../LocalLoading"

const About = ({ selectedPokeInfos, pokeDetails, loading, color }) => {
  const rawDesc = pokeDetails?.flavor_text_entries?.[2]?.flavor_text
  const okDesc = formatDesc(rawDesc)
  const useableDesc = capitalizeUppercase(okDesc)

  return (
    <div id="about" className="h-full w-full flex flex-col px-6 pt-3">
      {loading ? (
        <LocalLoading color={color} />
      ) : (
        <div>
          <p className="w-full text-lg mb-4 text-[#9e9e9e]">{useableDesc}</p>
          <h3 className="mb-1 font-bold text-lg text-center text-white">
            Pokémon's data
          </h3>
          <div className="flex mb-4 gap-4 ">
            <ul className="text-white">
              <li>Height:</li>
              <li>Weight:</li>
            </ul>
            <div>
              <ul className="text-[#9e9e9e]">
                <li>{selectedPokeInfos?.height / 10 + "m"}</li>
                <li>
                  {selectedPokeInfos?.weight / 10 +
                    "kg (" +
                    ((selectedPokeInfos?.weight / 10) * 2.204).toFixed(1) +
                    "lbs)"}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4">
            <ul className="text-white">
              <li>Capture Rate:</li>
              <li>Base Happiness:</li>
              <li>Base Exp:</li>
              <li>Growth Rate:</li>
            </ul>
            <ul className="text-[#9e9e9e]">
              <li>{pokeDetails?.capture_rate} / 255</li>
              <li>{pokeDetails?.base_happiness} / 255</li>
              <li>{selectedPokeInfos?.base_experience}</li>
              <li>{pokeDetails?.growth_rate?.name}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
