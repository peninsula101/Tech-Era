import {Route, Switch, Redirect} from 'react-router-dom'

import HomePage from './components/HomePage'

import CourseCardDetails from './components/CourseCardDetails'

import NotFound from './components/NotFoundRoute'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/courses/:id" component={CourseCardDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
