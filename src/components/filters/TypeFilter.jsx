import React from "react"
import { textColors } from "../../utils/color"
import { typeListSvg, typeList } from "../../utils/svgs"

const TypeFilter = () => {
  return (
    <div className="text-white flex flex-col justify-center items-center">
      <div className="w-3/4">
        <h3 className="text-xl font-semibold mb-3">Types: </h3>
        <div className="flex flex-row gap-2 flex-wrap">
          {typeList.map((type) => (
            <div
              key={type}
              style={{ backgroundColor: textColors[type] }}
              className="p-1 rounded flex gap-1 cursor-pointer"
            >
              <img src={typeListSvg[type]} alt={type} className=" w-4" />
              <p className="capitalize font-semibold text-sm">{type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TypeFilter
