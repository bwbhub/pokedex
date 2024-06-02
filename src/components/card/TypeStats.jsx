import React, { useEffect, useState } from "react"
import pokeApi from "../../api/modules/pokedex.api"
import { typeListSvg } from "../../utils/svgs"
import { textColors } from "../../utils/color"

const TypeStats = ({ selectedPokeInfos }) => {
  const [mainTypeIs, setMainTypeIs] = useState(null)
  const [secondTypeIs, setSecondTypeIs] = useState(null)

  const mainType = selectedPokeInfos.types[0]?.type?.name
  const secondType = selectedPokeInfos?.types[1]?.type?.name

  const noDmg = []
  const halfDmg = []
  const doubleDmg = []

  const noDmgFromMain = mainTypeIs?.no_damage_from?.map(
    (statObj) => statObj?.name
  )

  const halfDmgFromMain = mainTypeIs?.half_damage_from?.map(
    (statObj) => statObj?.name
  )

  const doubleDmgFromMain = mainTypeIs?.double_damage_from?.map(
    (statObj) => statObj?.name
  )

  const noDmgFromSecond = secondTypeIs?.no_damage_from?.map(
    (statObj) => statObj?.name
  )
  const halfDmgFromSecond = secondTypeIs?.half_damage_from?.map(
    (statObj) => statObj?.name
  )
  const doubleDmgFromSecond = secondTypeIs?.double_damage_from?.map(
    (statObj) => statObj?.name
  )

  const pushUnique = (arr, values) => {
    values.forEach((value) => {
      if (!arr.includes(value)) {
        arr.push(value)
      }
    })
  }

  if ((noDmgFromMain, halfDmgFromMain, doubleDmgFromMain !== undefined)) {
    pushUnique(noDmg, noDmgFromMain)
    pushUnique(halfDmg, halfDmgFromMain)
    pushUnique(doubleDmg, doubleDmgFromMain)
  }

  if ((noDmgFromSecond, halfDmgFromSecond, doubleDmgFromSecond !== undefined)) {
    pushUnique(noDmg, noDmgFromSecond)
    pushUnique(halfDmg, halfDmgFromSecond)
    pushUnique(doubleDmg, doubleDmgFromSecond)
  }

  useEffect(() => {
    const getMainType = async (typeName) => {
      const { response, err } = await pokeApi.getType({ typeName: typeName })

      if (response) {
        const data = response.damage_relations
        setMainTypeIs(data)
      } else {
        console.error(err)
      }
    }
    const getSecondType = async (typeName) => {
      const { response, err } = await pokeApi.getType({ typeName: typeName })

      if (response) {
        const data = response.damage_relations
        setSecondTypeIs(data)
      } else {
        console.error(err)
      }
    }

    getMainType(mainType)
    if (secondType !== undefined) {
      getSecondType(secondType)
    }
  }, [])

  return (
    <div className="w-full h-auto text-white px-2">
      <div className={noDmg.length < 1 ? "hidden" : null}>
        <h3>Takes no damages from:</h3>
        <div className="flex flex-row gap-2">
          {noDmg.map((type, idx) => (
            <div
              key={type + idx}
              className={`p-[5px] flex gap-1 justify-center items-center w-7 rounded`}
              style={{ backgroundColor: textColors[type] }}
            >
              <img src={typeListSvg[type]} alt={`${type}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className={halfDmg.length < 1 ? "hidden" : null}>
        <h3>Takes half damages from:</h3>
        <div className="flex flex-row gap-2">
          {halfDmg.map((type, idx) => (
            <div
              key={type + idx}
              className={`p-[5px] flex gap-1 justify-center items-center w-7 rounded`}
              style={{ backgroundColor: textColors[type] }}
            >
              <img src={typeListSvg[type]} alt={`${type}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className={doubleDmg.length < 1 ? "hidden" : null}>
        <h3>Takes double damages from:</h3>
        <div className="flex flex-row gap-2">
          {doubleDmg.map((type, idx) => (
            <div
              key={type + idx}
              className={`p-[5px] flex gap-1 justify-center items-center w-7 rounded`}
              style={{ backgroundColor: textColors[type] }}
            >
              <img src={typeListSvg[type]} alt={`${type}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TypeStats
