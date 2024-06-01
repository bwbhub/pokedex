import React, { useEffect, useState } from "react"
import pokeApi from "../../api/modules/pokedex.api"

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
  if (noDmgFromMain !== undefined) {
    noDmg.push(...noDmgFromMain)
    console.log(noDmg)
  }
  if (halfDmgFromMain !== undefined) {
    halfDmg.push(...halfDmgFromMain)
    console.log(halfDmg)
  }
  if (doubleDmgFromMain !== undefined) {
    doubleDmg.push(...doubleDmgFromMain)
    console.log(doubleDmg)
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

  return <div>TypeStats</div>
}

export default TypeStats
