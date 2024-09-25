import React, { Component } from 'react';
import axios from 'axios';
import Detail from './detailComponent';

class Event extends Component{
    state = {
        datas: [],
        isLoaded: false
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/fetch-event')
        .then(res => {
            this.setState({datas:[...res.data], isLoaded: true})
        })
    }

    render(){
        return(<div className="d-flex justify-content-center">
            <div className="col-md-9 col-12 row">
                {
                    this.state.isLoaded ?
                    this.state.datas.map((data,index) => {
                        let stringDate = (new Date(data.startingDate)).toString()
                        /*let sliceIndex = data.startingDate.indexOf('T');
                        let date = data.startingDate.slice(0,sliceIndex);
                        let [year, month, day] = date.split("-");*/
                        let [day, month, date, year] = stringDate.split(" ");

                        return <div className="col-md-6 font-monospace my-2" key={index}>
                                    <div className="border-bottom p-2">                                
                                        <div className="mb-3">
                                            <div className="col-11 row">
                                                <h5 className="col-10 text-capitalize h4" style={{wordWrap: 'break-word'}}>{data.title}</h5>
                                                <a href="#" className="col-2 fw-bold fst-italic btn-sm text-decoration-none" style={{color: '#ff9900'}}>Interested</a>
                                                <p className="text-lowercase fst-italic offset-1 border-top">starts on {day}-{month}/{date}/{year}</p>
                                            </div>
                                            {
                                                data.imgURL ? 
                                                    <div className="col-9 mx-3 event-image">
                                                        <img 
                                                            className="w-100 img-rounded ml-auto" 
                                                            src= {`http://localhost:5000/media/${data.imgURL}`} 
                                                            style={{height: '180px'}}
                                                            alt="eve"/>
                                                    </div> : ""
                                            
                                            }
                                            
                                        </div>        
                                        <Detail key={index}
                                                detailText={data.description}/>
                                        <div className="border-top">
                                            <span className="ms-2 fst-italic"> by: John Doe</span>
                                        </div>
                                    </div>
                                    
                                </div>
                        }) :
                        <div className="w-50 pt-5 pb-5 m-auto text-center">
                            <h2 className="m-5">Data is Loading.........</h2>
                        </div>
                }
            </div>
        </div>)
            
    }
}

export default Event;