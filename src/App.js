import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import About from './components/About'
import Home from './components/Home'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Header from './components/Header'
import StateSpecific from './components/StateSpecific'
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/footer" component={Footer} />
          <Route exact path="/about" component={About} />
          <Route exact path="/:stateCode" component={StateSpecific} />
          <Route component={NotFound} />
        </Switch>
      </>
    )
  }
}

export default App
