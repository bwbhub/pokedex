import "./App.css"
import Header from "./components/Header"
import List from "./components/List"
import PokeSvg from "./components/PokeSvg"

function App() {
  const loading = true

  return (
    <div className="flex flex-col justify-center items-center my-8 max-w-7xl relative">
      <Header />
      <PokeSvg loading={loading} />

      <List />
    </div>
  )
}

export default App
