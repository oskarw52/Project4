import { useState } from 'react'

import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;





function App() {


  const [bannedWords, setBannedWords] = useState([])
  const [currentImage, setCurrentImage] = useState(null)
  const [breedName, setBreedName] = useState(null)
  const [country, setCountry] = useState(null)
  const [lifeSpan, setLifeSpan] = useState(null)

  const makeQuery = () => {


    let url = `https://api.thecatapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=1`
    callApi(url)

  }

  const addBannedWord = (word) => {
    if (!bannedWords.includes(word)) {
      setBannedWords([...bannedWords, word]);
    }
  }
  const callApi = async (query) => {

    let breed;
    let country;
    let life_span;
    let image;
    do {
      const response = await fetch(query);
      const json = await response.json();


      breed = json[0].breeds[0].name
      country = json[0].breeds[0].origin
      life_span = json[0].breeds[0].life_span
      image = json[0].url
    } while (bannedWords.includes(breed) || bannedWords.includes(country) || bannedWords.includes(life_span))

    

    setCurrentImage(image)
    setBreedName(breed)
    setCountry(country)
    setLifeSpan(life_span)
  }


  return (
    <div className='App'>
      <div className='Left'>
        <div className='img-container'>
          {currentImage ? (
            <img className='cat' src={currentImage}></img>
          ) : (
            <div></div>)}
        </div>
        <div className='attributes-container'>
          {currentImage ? (
            <div className='but-container'>
              <button className='atr-button' onClick={() => { addBannedWord(breedName) }}>{breedName}</button>
              <button className='atr-button' onClick={() => { addBannedWord(country) }}>{country}</button>
              <button className='atr-button' onClick={() => { addBannedWord(lifeSpan) }}>Lifespan: {lifeSpan}</button>
            </div>
          ) : (
            <div></div>)}
        </div>
        <button className='generate-button' onClick={makeQuery}>
          Generate
        </button>
      </div>
      <div className='Right'>
        <h2>Banned Words</h2>
        <ul>
          {bannedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
