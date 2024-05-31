import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true)
      console.log(isLoading)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [globalLoading])

  return (
    <div
      className={` ${isLoading ? "opacity-100" : "opacity-0"} w-screen h-screen fixed transition-all duration-700 ease-in-out z-50 bg-[#3b3b3b] pointer-events-none`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
        <div className="pokeball" />
      </div>
    </div>
  )
}

export default GlobalLoading
