import React from "react"
import { ResponsiveRadar } from "@nivo/radar"

const Stats = ({ pokeInfo, color }) => {
  const generalStats = pokeInfo?.stats
  const stats = generalStats.map((statObj) => ({
    stat: statObj?.stat?.name,
    value: statObj?.base_stat
  }))

  return (
    <div
      id="about"
      className="h-full w-full bg-white rounded-3xl flex flex-col items-center p-6"
    >
      <div className="h-2/3 w-full overflow-hidden">
        <ResponsiveRadar
          data={stats}
          keys={["value"]}
          indexBy="stat"
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
