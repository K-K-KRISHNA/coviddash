import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    faqData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({faqData: data, apiStatus: apiStatusConstants.success})
    }
  }

  loadingView = () => (
    <div className="loader" data-testid="aboutRouteLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {faqData} = this.state
    const {faq} = faqData
    let i = 0
    return (
      <>
        <div className="about-head">
          <h1 className="white">About</h1>
          <p className="gray">Last Updated On 23 October 2023</p>
        </div>
        <h3 className="white">COVID-19 Vaccines be ready for distribution</h3>
        <ul data-testid="faqsUnorderedList" className="ul-container">
          {faq.map(each => {
            i += 1
            return (
              <li key={i}>
                <p className="gray">{each.question}</p>
                <p className="blue">{each.answer}</p>
              </li>
            )
          })}
        </ul>
        <Footer />
      </>
    )
  }

  failureView = () => <h1>Failure View</h1>

  renderSuitableView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      default:
        return this.failureView()
    }
  }

  render() {
    return <div className="about-container">{this.renderSuitableView()}</div>
  }
}

export default About
