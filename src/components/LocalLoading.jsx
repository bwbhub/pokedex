import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import PokeSvg from "./PokeSvg"

const LocalLoading = ({ color }) => {
  const { localLoading } = useSelector((state) => state.globalLoading)

  const [isLocalLoading, setIsLocalLoading] = useState(true)

  useEffect(() => {
    if (localLoading) {
      setIsLocalLoading(true)
    } else {
      setTimeout(() => {
        setIsLocalLoading(false)
      }, 1000)
    }
  }, [isLocalLoading])

  return (
    <div
      className={` ${isLocalLoading ? "block" : "hidden"} w-full h-full relative rounded-3xl transition-all duration-500 ease-in-out z-50 bg-[#363636] pointer-events-none`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex justify-center">
        <PokeSvg color={color} />
      </div>
    </div>
  )
}

export default LocalLoading
