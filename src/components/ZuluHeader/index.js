import './ZuluHeader.scss'
import React from 'react'
import logo from '../../asserts/images/logo.png'

export function ZuluHeader (props) {
  return (
    <header className='header'>
      <nav>
        <ul className='header-nav'>
          <figure className='header-nav__logo'>
            <a href='./'>
              <img src={logo} alt='logo' />
            </a>
          </figure>
          <div className='header-nav__rigth'>
            <div className='header-nav__container'>
              <li className='main-nav__item'>
                {props.children}
              </li>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  )
}
