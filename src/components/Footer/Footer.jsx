import { FaCopyright, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (<footer>
    <p>{<FaCopyright />} OpenStreetMap contributors</p>
    <p>Geografiskdata hämtat från <a href="https://nominatim.org/release-docs/develop/api/Lookup/">OpenStreetMap Nominatim</a></p>
    <p>Väderprognos hämtat från <a href="https://opendata.smhi.se/metfcst/pmp/introduction">SMHI</a></p>
    <p>Tider för soluppgång och nedgång hämtat från <a href='https://api.met.no/weatherapi/sunrise/3.0/documentation'>yr.no</a></p>
    <p>Väder iconer från <a href="https://github.com/nrkno/yr-weather-symbols">yr.no</a></p>
    <p>{<FaGithub />} Kika närmare på projektet: <a href='https://github.com/angelika-friis/weather-app'>https://github.com/angelika-friis/weather-app</a></p>
</footer>);

export default Footer;