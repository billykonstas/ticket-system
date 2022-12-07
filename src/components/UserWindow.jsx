import { useState, useEffect } from 'react'

//calculates the width of the screen
const UserWindow = (props) => {

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    props.setWidth(screenSize);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

}

export default UserWindow;