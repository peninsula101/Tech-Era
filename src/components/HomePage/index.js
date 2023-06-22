import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Failure from '../FailureView'
import CourseItem from '../CourseItemCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePage extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseList: []}

  componentDidMount() {
    this.getCourseStack()
  }

  getCourseStack = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const courseUrl = `https://apis.ccbp.in/te/courses`
    const response = await fetch(courseUrl)

    if (response.ok === true) {
      const coursesData = await response.json()
      const formattedCoursesData = coursesData.courses.map(course => ({
        id: course.id,
        logoUrl: course.logo_url,
        name: course.name,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseList: formattedCoursesData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderCourses = () => {
    const {courseList} = this.state

    return (
      <>
        <Header />
        <div className="home-page-container">
          <h1 className="course-head">Courses</h1>
          <ul className="courses-bg-container">
            {courseList.map(eachCourse => (
              <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => <Failure onRetry={this.onRetryFetch} />

  onRetryFetch = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getCourseStack)
  }

  renderApiResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCourses()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-bg-container">{this.renderApiResults()}</div>
  }
}

export default HomePage
