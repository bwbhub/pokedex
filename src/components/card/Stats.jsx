import React from "react"
import { ResponsiveRadar } from "@nivo/radar"

const Stats = ({ selectedPokeInfos, color }) => {
  const generalStats = selectedPokeInfos?.stats

  const stats = generalStats.map((statObj) => ({
    stat: statObj?.stat?.name.replace(/special/i, "s"),
    value: statObj?.base_stat
  }))

  const bitImg = selectedPokeInfos?.sprites?.front_default

  return (
    <div
      id="about"
      className="h-full w-full bg-[#363636] rounded-3xl flex flex-col items-center p-2 "
    >
      <div className="h-2/3 w-full overflow-hidden relative mt-3">
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
          colors={color}
          borderColor={color}
          borderWidth={3}
          fillOpacity={0.4}
          gridLabelOffset={10}
          motionConfig="wobbly"
          gridShape="linear"
          enableDots={false}
          isInteractive={false}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#ffffff",
                  fontSize: 13,
                  textTransform: "capitalize"
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default Stats
