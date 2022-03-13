import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

import './index.css'

const SimilarJobsSection = props => {
  const {item} = props

  const updatedItem = {
    companyLogoUrl: item.company_logo_url,
    employmentType: item.employment_type,
    id: item.id,
    jobDescription: item.job_description,
    location: item.location,
    rating: item.rating,
    title: item.title,
  }
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = updatedItem
  console.log(id)
  return (
    <li className="each-similar-job-card">
      <div className="job-profile-title-container">
        <div className="company-logo-card">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="similar job company logo"
          />
        </div>

        <div className="similar-job-profile-title-card">
          <h1 className="job-title"> {title} </h1>
          <div className="rating-container">
            <AiFillStar className="rating-star" />
            <p className="job-rating"> {rating} </p>
          </div>
        </div>
      </div>
      <h1 className="description"> Description </h1>
      <p>{jobDescription} </p>
      <div className="location-job-type-section">
        <div className="job-location">
          <GoLocation className="location-icon" />
          <p className="location"> {location} </p>
        </div>
        <div className="job-type">
          <p> {employmentType} </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsSection
