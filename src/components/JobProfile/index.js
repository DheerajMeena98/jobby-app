import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookie from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobProfile extends Component {
  state = {
    currentStatus: apiStatusConstants.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({currentStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const jsonData = await response.json()
      const data = jsonData.profile_details
      const updateProfileData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }

      this.setState({
        currentStatus: apiStatusConstants.success,
        profileDetails: updateProfileData,
      })
    }
  }

  renderLoader = () => (
    <div className="job-profile-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="job-profile-card">
        <img src={profileImageUrl} />
        <p className="job-profile-name"> {name} </p>
        <p className="job-profile-bio"> {shortBio} </p>
      </div>
    )
  }

  renderJobProfile = () => {
    const {currentStatus} = this.state
    switch (currentStatus) {
      case 'SUCCESS':
        return this.renderJobProfileSuccessView()
      case 'FAILURE':
        return this.renderJobProfileFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="job-profile-card">{this.renderJobProfile()}</div>
  }
}

export default JobProfile
