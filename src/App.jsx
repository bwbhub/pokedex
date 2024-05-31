import "./App.css"
import List from "./components/List"
import logo from "./assets/logo.png"
import PokeSvg from "./components/PokeSvg"

function App() {
  return (
    <div className="flex flex-col justify-center items-center my-8 max-w-7xl relative">
      <img src={logo} alt="pokedex" className=" w-60" />
      <PokeSvg />
      <List />
    </div>
  )
}

export default App
