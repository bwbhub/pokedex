import "./App.css"
import List from "./components/List"
import logo from "./assets/logo.png"
import PokeSvg from "./components/PokeSvg"

function App() {
  const loading = true

  return (
    <div className="flex flex-col justify-center items-center my-8 max-w-7xl relative">
      <img src={logo} alt="pokedex" className=" w-60" />

      <PokeSvg loading={loading} />

      <List />
    </div>
  )
}

export default App
