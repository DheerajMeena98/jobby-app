const EmploymentFilters = props => {
  const {item, onClickEmploymentType} = props
  const clickEmploymentType = event => {
    onClickEmploymentType(event)
  }

  return (
    <li className="employement-type-filter" key={item.employmentTypeId}>
      <label htmlFor={item.employmentTypeId} className="each-label-text">
        {' '}
        <input
          type="checkbox"
          id={item.employmentTypeId}
          onChange={e => clickEmploymentType(e)}
        />
        {item.label}
      </label>
    </li>
  )
}

export default EmploymentFilters
