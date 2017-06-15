'use strict';

import React from 'react';
import {Backend} from './../../backend';

export default class Imgblock extends React.Component{

    constructor(props){
        super(props);
        this.state={
            src:''
        }
	}
/*
    componentWillMount(){
        if(this.props.mediaId!=0){
            Backend.getMedia(this.props.mediaId).then((data)=>{
                this.setState({
                    src:data.guid.rendered
                })
            })
        } else {
            this.setState({
                src:'http://lorempixel.com/200/200'
            })
        }
        console.log('imgblock componentWillMount');
    }*/

    componentDidMount(){
        if(this.props.mediaId!=0){
            Backend.getMedia(this.props.mediaId).then((data)=>{
                this.setState({
                    src:data.media_details.sizes.watSize.source_url
                })
            })
        } else {
            this.setState({
                src:'http://lorempixel.com/200/200'
            })
        }
        console.log('imgblock componentDidMount');
    }

    shouldComponentUpdate(){
        if(this.props.mediaId!=0){
            Backend.getMedia(this.props.mediaId).then((data)=>{
                this.setState({
                    src:data.media_details.sizes.watSize.source_url
                })
            })
        } else {
            this.setState({
                src:'http://lorempixel.com/200/200'
            })
        }
        console.log('imgblock shouldComponentUpdate');
        return true;
    }


    render(){
        if(this.state.src!=''){
            return(
                <img src={this.state.src}/>
            )
        } else {
            return(
                <section>
                    <i className="fa fa-spinner fa-spin"></i>
                </section>
            )
        }

    }
}
