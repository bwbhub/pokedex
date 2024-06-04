import React from "react"
import { ResponsiveRadar } from "@nivo/radar"
import LocalLoading from "../LocalLoading"
import TypeStats from "./TypeStats"

const Stats = ({ selectedPokeInfos, color, loading }) => {
  const generalStats = selectedPokeInfos?.stats

  const stats = generalStats.map((statObj) => ({
    stat: statObj?.stat?.name.replace(/special/i, "s"),
    value: statObj?.base_stat
  }))

  const maxValuecheck = (stats) => {
    for (let i = 0; i < stats?.length; i++) {
      const value = stats[i]?.value
      if (value > 150) return true
    }
  }

  const bitImg = selectedPokeInfos?.sprites?.front_default

  return (
    <div id="about" className="h-full w-full flex flex-col items-center p-2 ">
      {loading ? (
        <LocalLoading color={color} />
      ) : (
        <div className="h-full w-full mt-3 flex flex-col gap-2">
          <div className="h-2/3 w-full relative">
            <img
              src={bitImg}
              alt="bit-version"
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-1/5"
            />
            <ResponsiveRadar
              data={stats}
              keys={["value"]}
              indexBy="stat"
              maxValue={maxValuecheck(stats) === true ? 255 : 155}
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
              isInteractive={true}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: "#ffffff",
                      fontSize: 13,
                      textTransform: "capitalize"
                    }
                  }
                },
                tooltip: {
                  container: {
                    textTransform: "capitalize"
                  }
                }
              }}
            />
          </div>
          <TypeStats selectedPokeInfos={selectedPokeInfos} />
        </div>
      )}
    </div>
  )
}

export default Stats
