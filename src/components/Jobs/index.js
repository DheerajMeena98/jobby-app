import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import JobsSection from '../JobsSection/index'

const Jobs = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <JobsSection />
    </>
  )
}

export default Jobs
