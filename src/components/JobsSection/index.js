import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobCard from '../JobCard/index'
import JobProfile from '../JobProfile/index'
import FiltersGroup from '../FiltersGroup/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsSection extends Component {
  state = {
    currentStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    employmentTypeFilter: '',
    salaryRangeFilter: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({currentStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentTypeFilter, salaryRangeFilter} = this.state
    console.log(searchInput)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeFilter}&minimum_package=${salaryRangeFilter}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsList = data.jobs.map(item => ({
        id: item.id,
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({
        jobsList: updatedJobsList,
        currentStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({currentStatus: apiStatusConstants.failure})
    }
  }

  renderJobsSection = () => {
    const {jobsList} = this.state
    const shouldShowJobs = jobsList.length > 0

    return shouldShowJobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} eachJob={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-image"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button type="button" className="job-profile-retry-button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderAllJobs = () => {
    const {currentStatus} = this.state
    switch (currentStatus) {
      case 'SUCCESS':
        return this.renderJobsSection()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  onSearchFilterJobs = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    this.setState({searchInput: event.target.value})
    this.getJobs()
  }

  salaryFilter = async salaryLabel => {
    await this.setState({salaryRangeFilter: salaryLabel})
    this.getJobs()
  }

  employmentTypeFilter = async jobTypeFilters => {
    await this.setState({employmentTypeFilter: jobTypeFilters})
    console.log(jobTypeFilters)
    this.getJobs()
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {searchInput} = this.state

    return (
      <div className="jobs-section-bcg-container">
        <div className="job-profile-filters-group-container">
          <JobProfile />
          <hr className="hr-line" />
          <FiltersGroup
            salaryFilter={this.salaryFilter}
            employmentTypeFilter={this.employmentTypeFilter}
          />
        </div>
        <div className="all-jobs-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="search"
              value={searchInput}
              onChange={this.onSearchFilterJobs}
            />
            <button
              testid="searchButton"
              type="button"
              className="search-button"
              onClick={this.onEnterSearchInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default JobsSection
