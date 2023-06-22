import {Link} from 'react-router-dom'
import './index.css'

const CourseItemCard = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="course-list-item">
        <img src={logoUrl} alt={name} className="img-logo-style" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItemCard
