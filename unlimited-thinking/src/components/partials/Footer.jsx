import React from "react";

const Footer = () => {
    const year = new Date()

    return <footer className="footer">&copy; Callum McNeil {year.getFullYear()} Disclaimer: this website is not affliated with Cineworld and is intended as a project of Callum McNeil to develop skills in Web design and functionality</footer>
}


export default Footer;