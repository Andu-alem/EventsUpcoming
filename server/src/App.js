//import logo from './logo.svg';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/headerComponent';
import Routes from './components/routesComponent';
import Footer from './components/footer';

class App extends Component{
  render() {
      return(
        <div className="container-fluid">
          <Router>
            <Header />
            <Routes />
            <Footer />
          </Router>
        </div>
      );

    }
}

export default App;
