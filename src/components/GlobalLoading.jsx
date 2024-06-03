import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import PokeSvg from "./PokeSvg"

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [globalLoading])

  return (
    <div
      className={` ${isLoading ? "opacity-100" : "opacity-0"} w-screen h-screen fixed left-0 top-0 transition-all duration-2000 ease-in-out z-50 bg-[#3b3b3b] pointer-events-none`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex justify-center">
        <PokeSvg />
      </div>
    </div>
  )
}

export default GlobalLoading
