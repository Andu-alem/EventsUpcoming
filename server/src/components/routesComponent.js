import { Component } from 'react';
import { Route } from 'react-router-dom'
import Event from './eventComponent'
import PostEvent from './postEventComponent'
import About from './aboutComponent'

class Routes extends Component{
    render(){
        return (
            <div>
                <Route exact path="/" component= { Event } />
                <Route path="/create-event" component = { PostEvent } />
                <Route path="/about" component = { About } />
            </div>
        )
    }
}

export default Routes