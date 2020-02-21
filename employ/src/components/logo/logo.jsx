import React from 'react'
import './logo.less'
import logo from './logo.png'
export default function Logo() {
  return (
    <div className="logo_container">
      <img className="logo_img" src={logo} alt="logo"></img>
    </div>
  )
}