import { useState, useEffect } from 'react'
import React from 'react';
import './Global.css'
import Game from './Game'

function App() {
  return (
    <>
      <div className="container">
        <h1> ♣♦ Blackjack ♥♠ </h1>
        <div className="firstunderline"/>
        <div className="main-content">
          <Game />
        </div>
        <div className="secondunderline"/>
        <footer className="footer">
          <p>Made by <a href="https://github.com/iveroam" target="_blank" rel="noopener noreferrer">@iveroam</a></p>
        </footer>
      </div>
    </>
  )
}

export default App