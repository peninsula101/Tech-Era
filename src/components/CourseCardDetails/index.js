import {Component} from 'react'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class CourseCardDetails extends Component {
  state = {courseData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const urlResponse = await fetch(url)
    if (urlResponse.ok === true) {
      const courseDataResponse = await urlResponse.json()

      const courseDetails = courseDataResponse.course_details
      const formattedCourseDetails = {
        description: courseDetails.description,
        id: courseDetails.id,
        imageUrl: courseDetails.image_url,
        name: courseDetails.name,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseData: {...formattedCourseDetails},
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={40} width={40} color="#1e293b" />
    </div>
  )

  renderCourseDetails = () => {
    const {courseData} = this.state
    const {name, description, imageUrl} = courseData

    return (
      <div className="course-details-bg-container">
        <img src={imageUrl} alt={name} className="course-img" />
        <div className="course-info-container">
          <h1 className="course-name">{name}</h1>
          <p className="course-info">{description}</p>
        </div>
      </div>
    )
  }

  renderFailure = () => <FailureView onRetry={this.retryFetch} />

  retryFetch = () => {
    this.setState(
      {apiStatus: apiStatusConstants.initial},
      this.getCourseDetails,
    )
  }

  renderResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderResults()}
      </div>
    )
  }
}

export default CourseCardDetails
