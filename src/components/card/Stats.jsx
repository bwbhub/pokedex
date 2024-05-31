import React from "react"
import { ResponsiveRadar } from "@nivo/radar"

const Stats = ({ selectedPokeInfos, color }) => {
  const generalStats = selectedPokeInfos?.stats

  const stats = generalStats.map((statObj) => ({
    stat: statObj?.stat?.name,
    value: statObj?.base_stat
  }))

  const bitImg = selectedPokeInfos?.sprites?.front_default

  return (
    <div
      id="about"
      className="h-full w-full bg-white rounded-3xl flex flex-col items-center p-2"
    >
      <div className="h-2/3 w-full overflow-hidden relative">
        <img
          src={bitImg}
          alt="bit-version"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-1/5"
        />
        <ResponsiveRadar
          data={stats}
          keys={["value"]}
          indexBy="stat"
          maxValue="150"
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          valueFormat=">-.0f"
          borderColor={color}
          gridLabelOffset={10}
          borderWidth={1}
          motionConfig="wobbly"
          gridShape="linear"
          enableDots={false}
          isInteractive={false}
        />
      </div>
    </div>
  )
}

export default Stats
