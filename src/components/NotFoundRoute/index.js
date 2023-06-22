import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="pnf-head">Page Not Found</h1>
      <p className="not-found-sub-head">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
