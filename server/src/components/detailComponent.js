import React, { Component } from 'react';

class Detail extends Component{
    state = {
        showDetail: false
    }
    onClickHandler = ()=>{
        this.setState({showDetail: !this.state.showDetail})
    }
    render(){
        let style = {
            lineHeight : "1.2em",
            fontSize : "22px",
            marginLeft: "10px",
            cursor: "pointer",
            wordWrap: "break-word"
        }
        return this.state.showDetail ?
                <div onClick={this.onClickHandler}>
                    <p className="text-secondary" style={ style }>{this.props.detailText}</p>
                </div>
                : 
                <div className="text-secondary" onClick={this.onClickHandler}>
                    <p style={ style }>
                        {this.props.detailText.slice(0,50)} <br/>
                        <span className="fst-italic">See more...</span>
                    </p>
                </div>
    }
}

export default Detail;