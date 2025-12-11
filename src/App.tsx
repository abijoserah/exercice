
import { useEffect, useState } from 'react'
import './App.css'

interface Cat {
  id: string,
  image: string,
  name: string,
  age: number
}

interface ApiCat {
  id: string,
  url: string
}

const catNames = [
  "Milo", "Luna", "Simba", "Nala", "Oreo", "Bella", "Max", "Misty",
  "Shadow", "Tiger", "Willow", "Cleo", "Pumpkin", "Snow", "Sushi"
];

function randomName() {
  return catNames[Math.floor(Math.random() * catNames.length)]
}

function randomAge() {
  return Math.floor(Math.random() * 18) + 1
}
function App() {

  const [cats, setCats] = useState<Cat[]>([])
  useEffect(() => {
    async function loadCats() {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?include_breeds=1&limit=10")
      const catsFromApi: ApiCat[] = await response.json()

      const finalCats: Cat[] = catsFromApi.map((cat) => {
        return {
          id: cat.id,
          image: cat.url,
          name: randomName(),
          age: randomAge(),
        }
      })
      setCats(finalCats)
    }
    loadCats()
  }, [])


  return (
    <>
      <form>
        <label htmlFor='catInput'>Search</label>
        <input type='text' id='catInput' />
        <button>Enter</button>
      </form>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 15
      }}>
        {cats.map((cat) => (
          <div key={cat.id} style={{
            backgroundColor: 'green',
            borderRadius: 8
          }}
          >
            <h2>{cat.name}</h2>
            <img src={cat.image} alt='A cat photo' width={300} height={300} />
            <h3>{cat.age} years old</h3>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
