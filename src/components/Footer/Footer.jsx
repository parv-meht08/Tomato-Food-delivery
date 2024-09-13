/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img src={assets.logo} alt="" />
                        <p>Our food delivery app brings your favorite meals straight to your doorstep with just a few taps. Enjoy a wide variety of cuisines from top restaurants, all delivered fast and fresh. Whether it's a quick snack or a full-course meal, we've got you covered. Satisfy your cravings anytime, anywhere!</p>
                        <div className="footer-social-icon">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />
                        </div>

                    </div>
                    <div className="footer-content-right">
                        <h2>COMPANY</h2>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-center">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+91 1234567890</li>
                            <li>contact@tomato.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">Copyright 2024 © Tomato.com-All Right Reserved </p>
            </div>
        </div>
    )
}

export default Footer