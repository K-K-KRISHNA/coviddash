import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import NotFound from '../NotFound'
import './index.css'

const apiStatusConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

function monthToWords(monthNumber) {
  switch (monthNumber) {
    case 1:
      return 'January'
    case 2:
      return 'February'
    case 3:
      return 'March'
    case 4:
      return 'April'
    case 5:
      return 'May'
    case 6:
      return 'June'
    case 7:
      return 'July'
    case 8:
      return 'August'
    case 9:
      return 'September'
    case 10:
      return 'October'
    case 11:
      return 'November'
    case 12:
      return 'December'
    default:
      return 'Invalid month'
  }
}

function Tail(stringNum) {
  const num = Number(stringNum)
  const last = num % 10
  if (last === 1) return 'st'
  if (last === 2) return 'nd'
  if (last === 3) return 'rd'
  return 'th'
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateSpecific extends Component {
  state = {
    activeTab: 'CONFIRMED',
    stateCode: '',
    stateName: '',
    specificData: [],
    apiStatus: apiStatusConstants.intial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    let {stateCode} = params
    stateCode = stateCode.toUpperCase()
    this.setState({stateCode, apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const specific = data[stateCode]
      const state = statesList.filter(
        each => each.state_code.toUpperCase() === stateCode.toUpperCase(),
      )
      if (state.length !== 0) {
        const stateName = state[0].state_name
        this.setState({stateName})
      }
      stateCode = stateCode.toUpperCase()
      this.setState({
        specificData: specific,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuitableView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return this.loadingView()
    }
  }

  successView = () => {
    const {specificData, stateCode, stateName, activeTab} = this.state
    console.log(specificData, stateName)
    const {total} = specificData
    const {tested} = total
    const lastUpdated = specificData.meta.last_updated.slice(0, 10)
    const [year, month, day] = lastUpdated.split('-')
    console.log('year:', year)
    console.log('month:', month)
    console.log('day:', day)
    const monthInWords = monthToWords(Number(month))
    const dayTail = Tail(day)
    const lastUpdatedInWords = monthInWords.concat(
      ' ',
      String(Number(day)),
      dayTail,
      ' ',
      year,
    )

    const {confirmed, deceased, recovered} = total
    const active = confirmed - (deceased + recovered)
    const ConfirmedActiveOrDeactive =
      activeTab === 'CONFIRMED' ? 'active-confirmed' : null
    const RecoveredActiveOrDeactive =
      activeTab === 'RECOVERED' ? 'active-recovered' : null
    const DeceasedActiveOrDeactive =
      activeTab === 'DECEASED' ? 'active-deceased' : null
    const ActiveActiveOrDeactive =
      activeTab === 'ACTIVE' ? 'active-active' : null

    return (
      <>
        <div className="state-details">
          <div>
            <h1 className="state-name">{stateName}</h1>
            <p className="last-update">Last Update On {lastUpdatedInWords}</p>
          </div>
          <div className="tested">
            <p>Tested</p>
            <p>{tested}</p>
          </div>
        </div>
        <div className="cards-container">
          <div
            className={`card confirmed confirmed-hover ${ConfirmedActiveOrDeactive}`}
            data-testid="stateSpecificConfirmedCasesContainer"
          >
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630600/tickMark_wgsmlp.png"
              alt="state specific confirmed cases pic"
              className="icon-size"
            />
            <p>{confirmed}</p>
          </div>
          <div
            className={`card blue-color blue-color-hover ${ActiveActiveOrDeactive}`}
            data-testid="stateSpecificActiveCasesContainer"
          >
            <p>Active</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630599/protection_1_k8s7fy.png"
              alt="state specific active cases pic"
              className="icon-size"
            />
            <p>{active}</p>
          </div>
          <div
            className={`card recovered recovered-hover ${RecoveredActiveOrDeactive}`}
            data-testid="stateSpecificRecoveredCasesContainer"
          >
            <p>Recovered</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630600/recovered_1_rkxjwd.png"
              alt="state specific recovered cases pic"
              className="icon-size"
            />
            <p>{recovered}</p>
          </div>
          <div
            className={`card deceased deceased-hover ${DeceasedActiveOrDeactive}`}
            data-testid="stateSpecificDeceasedCasesContainer"
          >
            <p>Deceased</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630599/breathing_1_djx8hd.png"
              alt="state specific deceased cases pic"
              className="icon-size"
            />
            <p>{deceased}</p>
          </div>
        </div>
      </>
    )
  }

  failureView = () => <h1>Failure View</h1>

  loadingView = () => (
    <div data-testid="stateDetailsLoader" className="align-center">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {match} = this.props
    const {params} = match
    let {stateCode} = params
    stateCode = stateCode.toUpperCase()
    const val = statesList.some(each => each.state_code === stateCode)
    return val ? (
      <div className="specific-container">{this.renderSuitableView()}</div>
    ) : (
      <NotFound />
    )
  }
}

export default StateSpecific
