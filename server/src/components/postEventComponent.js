import React, { Component, createRef } from 'react'
import axios from 'axios';

class PostEvent extends Component{
    state = {
        title: "",
        description: "",
        startingDate: null,
        isDisabled: true,
        errorMessage: "",
        fileData: null,
        isSending: false
    }
    titleRef = createRef()
    descriptionRef = createRef()
    dateRef = createRef()
    fileRef = createRef()

    onChangeHandler=(ev)=>{
        let title = this.titleRef.current
        let description = this.descriptionRef.current
        let startingDate = this.dateRef.current
        let file = this.fileRef.current
        
        if(title.value !== "" && description.value !== "" && startingDate.value !== ""){
            this.setState({
                isDisabled: false
            })
        }else{
            this.setState({ isDisabled: true });
        }
        if(ev.target.type == "textarea"){
            if(ev.target.value.length > 2*(ev.target.cols-3)){
                ev.target.rows = Math.ceil(ev.target.value.length/(ev.target.cols-2))
            }
        }
    }
    submiter = (data) => {
        axios
            .post('http://localhost:5000/api/create-event',data)
            .then(res => console.log(res))
            this.setState({isSending: false})
            window.location = "/"
    }
    submitHandler=(e)=>{
        e.preventDefault();
        let title = this.titleRef.current
        let description = this.descriptionRef.current
        let startingDate = this.dateRef.current
        let file = this.fileRef.current

        if(title.value !== "" && description.value !== "" && startingDate.value !== ""){
            console.log('inside ot')
            this.setState({
                title: title.value,
                description: description.value,
                startingDate: startingDate.value,
                errorMessage: "",
                isDisabled: true,
                isSending: true
            })
            if(file.value !== ""){
                this.fileSubmit(file)
            }else{
                let data = {
                    title: title.value,
                    description: description.value,
                    startingDate: startingDate.value,
                    fileUploadFinished: true,
                    imgURL: ''
                }
                this.submiter(data)
            }
            title.value = ""
            description.value = ""
            startingDate.value = ""
            file.value = ""
        }
    }
    fileSubmit = (f) => {
        let file = f.files[0]
        console.log(file.size/1024)
        //used to preview the input image
        //let url = URL.createObjectURL(file)
        //this.setState({ fileData: url })
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            let index = 1;
            let initialIndex = 0;
            let lastIndex = 60000;
            let resultData = reader.result.replace(`data:${file.type};base64,`,'').trim()
            let loadingInterval = setInterval(() => {
                if(index <= Math.ceil((resultData.length/60000))){
                    let data = {
                        data: resultData.slice(initialIndex, 
                            lastIndex > resultData.length ? resultData.length: lastIndex),
                        fileUploadFinished: false,
                        imgURL: file.name
                    }

                    axios
                    .post('http://localhost:5000/api/create-event',data)
                    .then(res => {
                        index++
                        initialIndex = lastIndex
                        lastIndex = lastIndex + 60000
                    });
        
                }else{
                    console.log('Sending finished')
                    let data = {
                        fileUploadFinished: true,
                        title: this.state.title,
                        description: this.state.description,
                        startingDate: this.state.startingDate,
                        imgURL: file.name
                    }
                    this.submiter(data)
                    clearInterval(loadingInterval)
                }
            }, 700);
        });
        reader.readAsDataURL(file);
    }

    render(){
        return(
            <div className="mx-md-auto mt-4 mb-3 p-3 border col-md-8 text-secondary">
                <h3>{this.state.isSending ? 'data is sending':''}</h3>
                <h5>If you have any event that going to happen just post it....</h5>
                <form className="mx-md-5" onSubmit={this.submitHandler}>
                    <div className="m-2">
                        <p className="message text-danger">{this.state.errorMessage}</p>
                    </div>
                    <div className="m-2">
                        <label className="mb-2 form-label">The Event title:</label><br/>
                        <input ref={this.titleRef} name="title" onChange={this.onChangeHandler} type="text" />
                    </div>
                    <div className="m-2">
                        <label className="mb-2 form-label">Detail about the event:</label><br/>
                        <textarea 
                            type="textarea"
                            ref={this.descriptionRef} 
                            name="description" 
                            onChange={this.onChangeHandler} 
                            cols="34" />
                    </div>
                    <div className="m-2">
                        <label className="mb-2 form-label">Starting date:</label>&nbsp;&nbsp;
                        <input ref={this.dateRef} name="startingDate" onChange={this.onChangeHandler} type="date" />
                    </div>
                    <div className="m-2">
                        <label className="mb-2 form-label">Profile picture:</label>&nbsp;&nbsp;
                        <input ref={this.fileRef} type="file" name="file" accept="image/*" onChange={this.onChangeHandler}/>
                    </div>
                    <div className="m-2">
                        <button className="btn btn-success fw-bold" disabled={this.state.isDisabled}>Post</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostEvent