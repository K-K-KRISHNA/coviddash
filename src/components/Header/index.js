import {useState} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import {MdMenuOpen} from 'react-icons/md'
import './index.css'

const Header = () => {
  const value = window.location.pathname.toString()
  const initial = value.length === 0 ? value : value.slice(1)
  // console.log(initial)
  const [tab, changeTab] = useState(initial)
  const [mobileTab, toggleMobileTab] = useState(false)
  const homeClass = tab.length === 0 ? 'active' : 'dehigliter'
  const aboutClass = tab === 'about' ? 'active' : 'dehigliter'
  return (
    <>
      <nav className="container">
        <Link to="/" className="dehigliter">
          <h1 className="covid19" onClick={() => changeTab('')}>
            COVID19<span className="india">INDIA</span>
          </h1>
        </Link>
        <div className="mobile-view-container">
          <MdMenuOpen
            size="30"
            onClick={() => toggleMobileTab(prev => !prev)}
          />
        </div>
        <ul className="tabs-container">
          <Link to="/" className="dehigliter">
            <button
              type="button"
              className={homeClass}
              onClick={() => changeTab('')}
            >
              Home
            </button>
          </Link>
          <Link to="/about" className="dehigliter">
            <button
              type="button"
              onClick={() => changeTab('about')}
              className={aboutClass}
            >
              About
            </button>
          </Link>
        </ul>
      </nav>
      {mobileTab && (
        <div className="bg-container">
          <ul className="tabs">
            <Link to="/" className="dehigliter">
              <button
                type="button"
                className={homeClass}
                onClick={() => changeTab('')}
              >
                Home
              </button>
            </Link>
            <Link to="/about" className="dehigliter">
              <button
                type="button"
                className={aboutClass}
                onClick={() => changeTab('about')}
              >
                About
              </button>
            </Link>
          </ul>
          <AiFillCloseCircle
            size="30"
            className="close-btn"
            onClick={() => toggleMobileTab(prev => !prev)}
          />
        </div>
      )}
    </>
  )
}

export default withRouter(Header)
