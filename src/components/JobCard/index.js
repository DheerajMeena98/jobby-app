import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <Link to={`jobs/${id}`} className="job-link-item" key={`${id}`}>
      <li className="each-job-card" key={`${id}`}>
        <div className="job-profile-title-container">
          <div className="company-logo-card">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
          </div>

          <div className="job-profile-title-card">
            <h1 className="job-title"> {title} </h1>
            <div className="rating-container">
              <AiFillStar className="rating-star" />
              <p className="job-rating"> {rating} </p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-job-type-section">
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
        <h1 className="description-label"> Description </h1>
        <p> {jobDescription} </p>
      </li>
    </Link>
  )
}

export default JobCard
