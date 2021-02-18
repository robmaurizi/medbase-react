import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import history from './helpers/history';

import Header from './components/Header';
import Footer from './components/Footer';

import PeopleList from './pages/PeopleList';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';

import { auth } from './services/firebase';

import './components/EasyEdit.css';
import 'semantic-ui-css/semantic.min.css'

import './App.scss';



function PrivateRoute({ component: Component, authenticated, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
           ? <Component { ...props } />
          : <Redirect to={{ pathname: '/about', state: { from: props.location } }} />}
      />
    )
  };
  
  function PublicRoute({ component: Component, authenticated, ...rest }) {
  
      return (
        <Route
          { ...rest }
          render={(props) => authenticated === false
          ? <Component { ...props} />
          : <Redirect to='/' />
        }
        />
      )
  };
  
  class App extends React.Component {
      constructor() {
          super();

          this.state = {
              authenticated: false,
              loading: true
          }
      }

      componentDidMount() {
          auth().onAuthStateChanged( user => {
              if ( user ) {
                  this.setState({
                      authenticated: true,
                      loading: false
                  });
              } else {
                  this.setState({
                      authenticated: false,
                      loading: false
                  });
              }
          });
      }

      render() {
          return this.state.loading === true ? <h2>Loading...</h2>: (
              <div className="ui container">
                <Router history={history}>
                    <Header authenticated={this.state.authenticated} />
                    <Switch>
                        {/* <Route exact path="/" component={Home}></Route> */}
                        <PrivateRoute exact path="/" authenticated={this.state.authenticated} component={PeopleList}></PrivateRoute>
                        <PublicRoute exact path="/about" authenticated={this.state.authenticated} component={About}></PublicRoute>
                        <PublicRoute exact path="/signup" authenticated={this.state.authenticated} component={SignUp}></PublicRoute>
                        <PublicRoute exact path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
                    </Switch>
                    <Footer />
                </Router>
              </div>
          )
      }
  }

  export default App;