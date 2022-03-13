const SalariesFilter = props => {
  const {item, onClickSalaryFilter} = props
  const clickSalaryFilter = event => {
    onClickSalaryFilter(event)
  }

  return (
    <li className="salary-range-filter" key={item.salaryRangeId}>
      <input
        type="radio"
        name="salary"
        id={item.salaryRangeId}
        key={item.salaryRangeId}
        value={item.label}
        onClick={event => clickSalaryFilter(event)}
      />
      <label htmlFor={item.salaryRangeId} className="each-label-text">
        {' '}
        {item.label}
      </label>
    </li>
  )
}

export default SalariesFilter
