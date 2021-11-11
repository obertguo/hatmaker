import './App.css';
import Pixel from './components/Button';
import React, {useState } from 'react';

const rowSize = 8;
const colSize = 64;

const App = () =>{
  let [selectedColor, setSelectedColor] = useState<string>('#000000');
  
  const onColorChanged = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setSelectedColor(e.target.value);
  }

  const createPixels = () =>{
    let key = 0;
    let pixels = [];

    for(let row = 0; row < rowSize; ++row){
      let pixelRow = [];
      for(let col = 0; col < colSize; ++col){
        ++key;
        pixelRow.push(<Pixel key={key} selectedColor={selectedColor}/>);
      }

      ++key;
      pixelRow.push(<br key={key}/>);
      pixels.push(pixelRow);
    }
    return pixels;
  }

  const download = (e: React.MouseEvent) =>{
    e.preventDefault();

    let result = '';

    //Read each pixel data, and get their rgb values, and append to file. The file format is this: 
    //r,g,b
    //r,g,b,
    //r,g,b,
    //and so on...
    const pixels = Array.from(document.getElementsByClassName('pixel'));
    pixels.forEach(pixel =>{
      const rgb = (pixel as HTMLButtonElement).style.backgroundColor.split(',');
      const r = rgb[0].match(/\d/g)?.join('');
      const g = rgb[1].match(/\d/g)?.join('');
      const b = rgb[2].match(/\d/g)?.join('');
      result += `${r},${g},${b}\n`
    });
    
    //Hacky way to download text file from front end using js, but still works
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
    link.setAttribute('download', 'pattern.hat');

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  const uploadPattern = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    const reader = new FileReader();

    //Once read operation is finished, the text is stored in e.target.result
    reader.onload = async(e) =>{
      //Convert to array of ["r,g,b", "r,g,b", "r,g,b"]
      const res = (e.target?.result as string).split('\n');

      const pixels = Array.from(document.getElementsByClassName('pixel'));

      //assuming the pattern is valid, try iterating through each pattern and pixel until idx is no longer valid for either list
      let idx = 0;
      while(idx < pixels.length && idx < res.length){
        (pixels[idx] as HTMLButtonElement).style.background = `rgb(${res[idx]})`;
        ++idx;
      }
    }

    //Let the reader read the text file. Once finished, the result is stored in e.target.result
    if(e.target.files){
      reader.readAsText(e.target.files[0]!);
    }

    e.target.value = ""; //Reset path so the user can upload the same file again if they want
  }

  return(
    <div className="wrapper">
      <img src="/logo.png" width="50"/>
      <h1 style={{display: 'inline-block'}}>HatMaker</h1> 
      
      <p>Design hat patterns. The site is designed to work better on large screen devices/desktop mode.</p>
      <input type="color" onChange={onColorChanged}/>
      <h2 style={{display: 'inline'}}>Selected Color {selectedColor}</h2>
      <br/>
      <br/>
      {createPixels()}
      <br/>
      Upload Pattern <input type="file" accept=".hat" onChange={uploadPattern}/>

      <button onClick={download}>Download Pattern</button>
    </div>
  )
}

export default App;