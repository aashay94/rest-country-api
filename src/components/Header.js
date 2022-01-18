import React from 'react'
import '../index.css';
const Header = () => {
  const changeMode = () => {
    document.body.classList.toggle("dark-mode");   
  }

  return (
      <header className="header">
        <div>
          <h1>Country Details App
          </h1>
          <button className="change-theme" onClick={() => changeMode()}>
              Change Theme
          </button>
        </div>
      </header>
    
  )
}

export default Header