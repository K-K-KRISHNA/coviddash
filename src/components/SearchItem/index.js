import './index.css'
import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

const SearchItem = props => {
  const {details} = props
  const stateCode = details.state_code
  const stateName = details.state_name
  return (
    <Link to={`/${stateCode}`} className="dehighliter">
      <li className="list-item-container">
        <p>{stateName}</p>
        <div className="code-container">
          <p>{stateCode}</p>
          <BiChevronRightSquare size="24" />
        </div>
      </li>
    </Link>
  )
}

export default SearchItem
