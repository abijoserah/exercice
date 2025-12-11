
import { useEffect, useState } from 'react'
import './App.css'


const catNames = [
  "Milo", "Luna", "Simba", "Nala", "Oreo", "Bella", "Max", "Misty",
  "Shadow", "Tiger", "Willow", "Cleo", "Pumpkin", "Snow", "Sushi"
];

function randomCatName() {
  return catNames[Math.floor(Math.random() * catNames.length)]
}


function App() {

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
