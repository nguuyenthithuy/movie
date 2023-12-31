import React from 'react'
import "./style.scss"

import {

    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from '../contentWrapper/ContentWrapper';


const Footer = () => {
    return (
        <footer className='footer'>
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Commodi mollitia vel dolores, itaque autem tenetur voluptatibus numquam dolor!
                    Modi reprehenderit repellendus inventore, dolores eos obcaecati sit tempora culpa ut.
                    Consectetur.
                </div>
            </ContentWrapper>
            <div className="socialIcons">
                <span className="icon">
                    <FaFacebookF />
                </span>
                <span className="icon">
                    <FaInstagram />
                </span>
                <span className="icon">
                    <FaTwitter />
                </span>
                <span className="icon">
                    <FaLinkedin />
                </span>
            </div>
        </footer>
    )
}

export default Footer
