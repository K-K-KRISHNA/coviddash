import './index.css'
import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'

const Footer = () => (
  <div className="footer">
    <h1 className="covid19">
      COVID19<span className="india">INDIA</span>
    </h1>
    <p className="footer-tagline">
      we stand with everyone fighting on the front lines
    </p>
    <div className="icons-holder">
      <VscGithubAlt className="footer-icon" size="30" />
      <FiInstagram className="footer-icon" size="30" />
      <FaTwitter className="footer-icon" size="30" />
    </div>
  </div>
)

export default Footer
