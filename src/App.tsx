import logo from './logo.svg';
import './App.css';
import Pixel from './components/Button';
import React, {useState } from 'react';

const App = () =>{
  let [selectedColor, setSelectedColor] = useState<string>('#000000');
  
  const onColorChanged = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setSelectedColor(e.target.value);
  }

  const rowSize = 8;
  const colSize = 64;
  let i = 0;

  const createPixels = () =>{
    let pixels = [];

    for(let row = 0; row < rowSize; ++row){
      let pixelRow = [];
      for(let col = 0; col < colSize; ++col){
        ++i;
        pixelRow.push(<Pixel key={i} selectedColor={selectedColor}/>);
      }

      ++i;
      pixelRow.push(<br key={i}/>);
      
      pixels.push(pixelRow);
    }
    return pixels;
  }

  const download = () =>{

    let result = '';

    const pixels = Array.from(document.getElementsByClassName('pixel'));
    pixels.forEach(pixel =>{
      const rgb = (pixel as HTMLButtonElement).style.backgroundColor.split(',');
      const r = rgb[0].match(/\d/g)?.join('');
      const g = rgb[1].match(/\d/g)?.join('');
      const b = rgb[2].match(/\d/g)?.join('');
      result += `${r},${g},${b}\n`
    });
    
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
    pom.setAttribute('download', 'pattern.hat');

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
  }


  return(
    <div className="wrapper">
      <h1>HatMaker</h1>
      <input type="color" onChange={onColorChanged}/>
      <h2>Selected Color {selectedColor}</h2>

      {createPixels()}
      
      <button onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          download();
        }
      }>
        Download Pattern</button>
      
    </div>
  )
}

export default App;