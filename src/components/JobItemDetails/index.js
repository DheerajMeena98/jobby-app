import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header/index'
import SimilarJobsSection from '../SimilarJobsSection/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    currentStatus: apiStatusConstants.initial,
    jobDetails: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({currentStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookie.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
        lifeAtCompany: data.job_details.life_at_company,
        similarJobs: data.similar_jobs,
      }
      console.log(updatedData)
      this.setState({
        jobDetails: updatedData,
        currentStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({currentStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobDetails} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      id,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      lifeAtCompany,
      similarJobs,
    } = jobDetails

    this.renderSkills = item => {
      const updatedItem = {
        imageUrl: item.image_url,
        name: item.name,
      }

      const {imageUrl, name} = updatedItem

      return (
        <li className="each-skill-list-item" key={item.name}>
          <img src={imageUrl} alt={name} className="skill-logo" />
          <p> {name} </p>
        </li>
      )
    }

    return (
      <div className="job-details-bcg-container">
        <div className="job-details-card">
          <div className="job-details-profile-title-container">
            <div className="company-logo-card">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
            </div>

            <div className="job-profile-title-card">
              <h1 className="job-title"> {title} </h1>
              <div className="rating-container">
                <AiFillStar className="rating-star" />
                <p className="job-rating"> {rating} </p>
              </div>
            </div>
            <a href={companyWebsiteUrl} className="company-website-visit-link">
              {' '}
              Visit{' '}
            </a>
          </div>
          <div className="location-salary-container">
            <div className="location-job-type-details-section">
              <div className="job-location">
                <GoLocation className="location-icon" />
                <p className="location"> {location} </p>
              </div>
              <div className="job-type">
                <p> {employmentType} </p>
              </div>
            </div>
            <p> {packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="skills-heading"> Description </h1>
          <p> {jobDescription}</p>
          <h1 className="skills-heading"> Skills </h1>
          <ul className="skills-container">
            {skills.map(item => this.renderSkills(item))}
          </ul>
          <div className="life-at-the-company-section">
            <div>
              <h1 className="skills-heading"> Life at Company </h1>
              <p> {lifeAtCompany.description} </p>
            </div>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs </h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(item => (
            <SimilarJobsSection key={item.id} item={item} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsFailureView = () => {
    const {match} = this.props
    const {id} = match.params
    return (
      <div className="job-item-details-failure-view-container">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          className="failure-view-image"
        />
        <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
        <p> We cannot seem to find the page you are looking for</p>

        <button type="button" className="button">
          <Link to={`/jobs/${id}`}>Retry</Link>
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="job-profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {currentStatus} = this.state

    switch (currentStatus) {
      case 'SUCCESS':
        return this.renderJobDetailsView()
      case 'FAILURE':
        return this.renderJobDetailsFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        {' '}
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
