import React, { Component } from 'react';

class Footer extends Component{
    render(){
        return(
            <footer className="footer border-top text-center pt-3 bg-secondary">
                <div className="container row">
                    <span className="col-4">Contacts: </span>
                    <span className="col-4">Address: </span>
                    <span className="col-4">Services: </span>
                </div>
                <div>
                    <p>2024&copy; Andi tech.</p>
                </div>
            </footer>
        );
    }
}
export default Footer;