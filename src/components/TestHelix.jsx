import React from "react"
import "ldrs/helix"
import { helix } from "ldrs"

helix.register()

const TestHelix = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="pokeball"></div>
    </div>
  )
}

export default TestHelix
