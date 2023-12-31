import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {covidData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({apiStatus: apiStatusConstants.success, covidData: data})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-custom" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCovidFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-head">Something went wrong</h1>
    </div>
  )

  renderCovidSuccessView = () => {
    const {covidData} = this.state

    return (
      <div className="success-con">
        <VaccinationCoverage reqData={covidData.last_7_days_vaccination} />
        <VaccinationByGender genData={covidData.vaccination_by_gender} />
        <VaccinationByAge ageData={covidData.vaccination_by_age} />
      </div>
    )
  }

  renderFinal = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidSuccessView()
      case apiStatusConstants.failure:
        return this.renderCovidFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-custom">
        <div className="main-head-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="web-head">Co-WIN</h1>
        </div>
        <h1 className="main-head">CoWIN Vaccination in India</h1>
        {this.renderFinal()}
      </div>
    )
  }
}

export default CowinDashboard
