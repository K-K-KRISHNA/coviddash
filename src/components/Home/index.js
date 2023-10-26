import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import SearchItem from '../SearchItem'
import Footer from '../Footer'
import './index.css'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    data: [],
    confirmed: 0,
    active: 0,
    recovered: 0,
    deceased: 0,
    searchInput: '',
    dataInArray: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  calculation = arrayOfData => {
    let {confirmed, active, recovered, deceased} = this.state
    const {data} = this.state
    for (let i = 0; i < arrayOfData.length; i += 1) {
      confirmed += arrayOfData[i].confirmed
      active += arrayOfData[i].active
      recovered += arrayOfData[i].recovered
      deceased += arrayOfData[i].deceased
    }
    this.setState({
      confirmed,
      data,
      active,
      recovered,
      deceased,
      apiStatus: apiStatusConstants.success,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const {data} = this.state
    // console.log(data)
    const resultList = []
    //  getting keys of an object object

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      //    console.log(keyName)

      if (data[keyName]) {
        const {total} = data[keyName]
        //  if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const requiredState = statesList.find(
          state => state.state_code === keyName,
        )
        if (requiredState !== undefined) {
          resultList.push({
            stateCode: keyName,
            name: requiredState.state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })

    return resultList
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({data})
      const listFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod()
      //  console.log(listFormattedDataUsingForInMethod)
      this.setState({dataInArray: listFormattedDataUsingForInMethod})
      this.calculation(listFormattedDataUsingForInMethod)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    const {data, confirmed, active, deceased, recovered} = this.state
    this.setState({
      data,
      confirmed,
      active,
      deceased,
      recovered,
      searchInput: event.target.value,
    })
  }

  ascending = () => {
    const {dataInArray} = this.state
    dataInArray.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      if (nameA > nameB) {
        return 1
      }
      if (nameB > nameA) {
        return -1
      }
      return 0
    })

    this.setState(
      {
        dataInArray,
      },
      console.log(dataInArray),
    )
  }

  descending = () => {
    const {dataInArray} = this.state
    dataInArray.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      if (nameA > nameB) {
        return -1
      }
      if (nameB > nameA) {
        return 1
      }
      return 0
    })

    this.setState({
      dataInArray,
    })
  }

  successView = () => {
    const {
      active,
      confirmed,
      recovered,
      deceased,
      searchInput,
      dataInArray,
    } = this.state
    const filteredList = statesList.filter(each =>
      each.state_name.toLowerCase().startsWith(searchInput.toLowerCase()),
    )
    let i = 0
    return (
      <>
        <div className="search-holder">
          <div className="icon-container">
            <BsSearch size="20" />
          </div>
          <input
            className="search-container"
            type="search"
            placeholder="Enter the State"
            onChange={this.onChangeSearch}
          />
        </div>
        <ul data-testid="searchResultsUnorderedList">
          {searchInput.length !== 0 &&
            filteredList.map(each => {
              i += 1
              return <SearchItem details={each} key={i} />
            })}
        </ul>
        <ul className="cards-container ul-container">
          <div
            className="card confirmed confirmed-hover"
            data-testid="countryWideConfirmedCases"
          >
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630600/tickMark_wgsmlp.png"
              alt="country wide confirmed cases pic"
              className="icon-size"
            />
            <p>{confirmed}</p>
          </div>
          <div
            className="card blue-color blue-color-hover"
            data-testid="countryWideActiveCases"
          >
            <p>Active</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630599/protection_1_k8s7fy.png"
              alt="country wide active cases pic"
              className="icon-size"
            />
            <p>{active}</p>
          </div>
          <div
            className="card recovered recovered-hover"
            data-testid="countryWideRecoveredCases"
          >
            <p>Recovered</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630600/recovered_1_rkxjwd.png"
              alt="country wide recovered cases pic"
              className="icon-size"
            />
            <p>{recovered}</p>
          </div>
          <div
            className="card deceased deceased-hover"
            data-testid="countryWideDeceasedCases"
          >
            <p>Deceased</p>
            <img
              src="https://res.cloudinary.com/dksuhkvhr/image/upload/v1697630599/breathing_1_djx8hd.png"
              alt="country wide deceased cases pic"
              className="icon-size"
            />
            <p>{deceased}</p>
          </div>
        </ul>
        <table className="table-container">
          <thead>
            <tr>
              <th className="left-align">
                States/UT
                <button
                  data-testid="ascendingSort"
                  className="sort-btn"
                  type="button"
                >
                  <FcGenericSortingAsc
                    className="sort-icon"
                    onClick={this.ascending}
                  />
                </button>
                <button
                  data-testid="ascendingSort"
                  className="sort-btn"
                  type="button"
                >
                  <FcGenericSortingDesc color="red" onClick={this.descending} />
                </button>
              </th>
              <th className="right-align">Confirmed</th>
              <th className="right-align">Active</th>
              <th className="right-align">Recovered</th>
              <th className="right-align">Deceased</th>
              <th className="right-align">Population</th>
            </tr>
          </thead>
          <tbody>
            {dataInArray.map(each => {
              i += 1
              return (
                <tr key={i}>
                  <th className="left-align">{each.name}</th>
                  <th className="right-align confirmed">{each.confirmed}</th>
                  <th className="right-align blue-color">{each.active}</th>
                  <th className="right-align recovered">{each.recovered}</th>
                  <th className="right-align deceased">{each.deceased}</th>
                  <th className="right-align population">{each.population}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Footer />
      </>
    )
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

  loadingView = () => (
    <div data-testid="homeRouteLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => <h1>Failure View</h1>

  render() {
    return <div className="home-container">{this.renderSuitableView()}</div>
  }
}

export default Home
