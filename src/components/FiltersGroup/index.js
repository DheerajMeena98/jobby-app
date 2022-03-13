import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'

import SalariesFilter from '../SalariesFilter/index'
import EmploymentFilters from '../EmploymentFilters/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isChecked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isChecked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isChecked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isChecked: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
    isChecked: false,
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
    isChecked: false,
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
    isChecked: false,
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
    isChecked: false,
  },
]

let jobTypeString = ''

const emptyString = ''

class FiltersGroup extends Component {
  onClickSalaryFilter = event => {
    const {salaryFilter} = this.props
    console.log(event.target.id)
    salaryFilter(event.target.id)
  }

  renderSalariesFilters = () => (
    <ul className="salary-filters-container">
      {salaryRangesList.map(item => (
        <SalariesFilter
          key={item.salaryRangeId}
          item={item}
          onClickSalaryFilter={this.onClickSalaryFilter}
        />
      ))}
    </ul>
  )

  isJobIdChecked = jobId => {
    if (jobTypeString.includes(jobId)) {
      const jobIdStringWithCommaAtLast = `${jobId},`

      if (jobTypeString === jobId) {
        jobTypeString = emptyString
        return ''
      }

      if (jobTypeString.includes(jobIdStringWithCommaAtLast)) {
        jobTypeString = jobTypeString.replace(jobIdStringWithCommaAtLast, '')
      } else {
        const jobIdStringWithCommaAtFirst = `,${jobId}`
        jobTypeString = jobTypeString.replace(jobIdStringWithCommaAtFirst, '')
      }
    } else {
      const upStr = `,${jobId}`
      jobTypeString = jobTypeString.concat(upStr)
    }

    return jobTypeString
  }

  onClickEmploymentType = async event => {
    const {employmentTypeFilter} = this.props

    const jobId = event.target.id

    if (jobTypeString === '') {
      jobTypeString += jobId
      employmentTypeFilter(jobId)
    } else {
      const t = this.isJobIdChecked(jobId)
      employmentTypeFilter(t)
    }
  }

  renderCategoriesList = () => (
    <ul className="employement-type-container">
      {employmentTypesList.map(item => (
        <EmploymentFilters
          item={item}
          onClickEmploymentType={this.onClickEmploymentType}
          key={item.id}
        />
      ))}
    </ul>
  )

  render() {
    return (
      <div className="filters-group-container">
        <h1 className="type-of-employment-heading"> Type of Employment </h1>
        {this.renderCategoriesList()}
        <hr className="hr-line" />
        <h1 className="salary-range-heading"> Salary Range </h1>
        {this.renderSalariesFilters()}
      </div>
    )
  }
}

export default FiltersGroup
