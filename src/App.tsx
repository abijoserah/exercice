
import { useEffect, useState } from 'react'
import './App.css'


function App() {

  //
  const [cats, setCats] = useState([])
  useEffect(() => {
    async function loadCats() {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?include_breeds=1&limit=100")
      const catsFromApi = await response.json()
      console.log(catsFromApi)
      setCats(catsFromApi)
    }
    loadCats()
  }, [])

  return (
    <>
      {cats.map((cat) => (
        <img key={cat.id} src={cat.url} alt='A cat photo' />
      ))}
    </>
  )
}

export default App
