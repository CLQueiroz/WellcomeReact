import React from 'react';
import { Link } from 'react-router-dom';

import { MdCheckBox } from 'react-icons/md';
import { FaCalculator } from 'react-icons/fa'
import './Header.css'

import logoImg from '../assets/logo.png';

export default function Header (){
    return(
        <header>
            <img src={logoImg} alt=""/>
            <h1>Treinamentos React JS</h1>
            <nav>
                <Link to="/"><FaCalculator size={34}/></Link>
                <Link to="/todo"><MdCheckBox size={34}/></Link>
            </nav>
        </header>
    )
}