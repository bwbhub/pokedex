import React from "react"
import pokeball from "../../assets/pokeball.png"
import { textColors, hexToRgba } from "../../utils/color"
import { typeListSvg } from "../../utils/svgs"
import { formatId } from "../../utils/textConvert"

const TopCard = ({ pokeInfo, color, imgUrl }) => {
  const formatedId = formatId(pokeInfo?.id)

  return (
    <div
      id="top-panel"
      className="w-full h-[235px] flex rounded-b-3xl overflow-hidden flex-row mb-3 items-center text-white relative"
      style={{
        backgroundColor: color
      }}
    >
      <div className="absolute -top-4">
        <p
          className="bg-title relative text-9xl uppercase top-1 font-bold"
          style={{
            color: color
          }}
        >
          {pokeInfo?.name}
        </p>
        <span
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${hexToRgba(color, 1)} 10%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: "none"
          }}
        />
      </div>
      <div className="absolute w-1/3 left-10 bottom-4 opacity-30">
        <img src={pokeball} alt="Pokeball" className="relative" />
        <span
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, ${hexToRgba(color, 1.5)} 40%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: "none"
          }}
        />
      </div>
      <div className="w-1/2 h-full relative flex justify-center items-center">
        <img
          src={imgUrl}
          alt={pokeInfo?.name}
          className="w-5/6 z-100 saturate-150 brightness-105"
        />
      </div>
      <div className="w-1/2 h-full relative flex flex-col justify-center px-5 font-bold">
        <p>{formatedId}</p>
        <h2 className="first-letter:capitalize text-[26px]">
          {pokeInfo?.name}
        </h2>
        <div className="flex gap-3">
          {pokeInfo?.types?.map((type, idx) => (
            <div
              key={type + idx}
              className={`text-xs font-normal p-[5px] rounded flex gap-1 justify-center items-center`}
              style={{ backgroundColor: textColors[type?.type?.name] }}
            >
              <img
                src={typeListSvg[type?.type?.name]}
                alt={`${type?.type?.name}`}
                className=" w-4"
              />
              <p className="first-letter:capitalize">{type?.type?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopCard
