import React, { Component } from 'react';
import 'bootstrap';
/*import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';*/
import { Link } from 'react-router-dom'


class Header extends Component{
    state = {
        isOpen: false
    }
    toggle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-light bg-white sticky-top border-bottom">
                <div className="container navbar-header">
                        <a className="navbar-brand h3 text-dark offset-md-1" href="/">EventUpdater</a>
                        <button 
                            className="navbar-toggler" 
                            data-toggle="collapse"
                            data-target="#navbarResponsive"
                            onClick={this.toggle}>
                                <span className="navbar-toggler-icon"></span>
                        </button>
                </div>
                <div className="collapse navbar-collapse ms-md-5" style={this.state.isOpen ? {display: 'block'} : { display: 'none'}} id="navbarResponsive">
                    <ul className="navbar-nav me-md-5">
                        <li className="nav-item active px-md-1 ms-3">
                            <Link className="nav-link text-info" to="create-event">PostEvent</Link>                                
                        </li>
                        <li className="nav-item me-md-2 ms-3">
                            <Link className="nav-link text-info" to="about">About</Link> 
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;