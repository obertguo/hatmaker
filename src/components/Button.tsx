import React, { useState } from "react";

const Pixel = (props: any) =>{
    const selectedColor = props.selectedColor;

    let [color, setColor] = useState<string>('#ffffff');

    const click = (e: React.MouseEvent) =>{
        e.preventDefault();
        setColor(selectedColor);
    }

    return(
        <button className="pixel" onClick={click} style={{background: color}}></button>
    )
    
}

export default Pixel;