import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import Calendar from './Calendar'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <header className='App-header'>
            <p className='App-title'>ReactApp</p>
            <div className='App-nav'>
              <Link to='/'>home </Link>
              <Link to='/calendar'>calendar</Link>
            </div>
          </header>
          <Route exact path='/' component={() => <p>home content</p>} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/calendar' component={Calendar} />
        </div>
      </Router>
    )
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      email: '',
      pass: ''
    }
    this.login = this.login.bind(this)
    this.inputEmail = this.inputEmail.bind(this)
  }

  login = (e) => {
    e.preventDefault()

    if(this.state.email.length < 6) {
      alert('Имеил должен содержать не менне 6 букв :)')
      return
    }
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    })
  }
  inputEmail(e) {
    this.setState({ email: e.target.value })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <form>
        <p>Вы должны авторизироваться для доступа к  {from.pathname}</p>
        <input
          className='form-control'
          type='email'
          placeholder='email'
          onChange={this.inputEmail}
          value={this.state.email}
        /><br/>
        <input className='form-control' type='password' placeholder='password'/><br/>
        <input className='form-submit' type='submit' onClick={this.login} value='Log in'/>
      </form>
    )
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate (cb) {
    this.isAuthenticated = true
    setTimeout(cb, 500) // fake async
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)
export default App
