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

    componentDidMount(){
        if(this.props.mediaId!=0){
            Backend.getMedia(this.props.mediaId).then((data)=>{
                if(this.props.elem&&this.props.elem=="UserBar" || this.props.elem&&this.props.elem=="UserList"){
                    this.setState({
                        src:data.media_details.sizes.thumbnail.source_url
                    })
                }else{
                    this.setState({
                        src:data.media_details.sizes.watSize.source_url
                    })
                }
            })
        } else {
            this.setState({
                src:'./images/placeholder.png'
            })
        }
        console.log('imgblock componentDidMount');
    }
componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.mediaId!=this.props.mediaId){
    if(nextProps.mediaId!=0){
            Backend.getMedia(nextProps.mediaId).then((data)=>{
                if(nextProps.elem&&nextProps.elem=="UserBar"){
                    this.setState({
                        src:data.media_details.sizes.thumbnail.source_url
                    })
                }else{
                    this.setState({
                        src:data.media_details.sizes.watSize.source_url
                    })
                }
            })
        } else {
            this.setState({
                src:'./images/placeholder.png'
            })
        }
        console.log('imgblock reciveProps');
    }
}

    render(){
        if(this.state.src!=''){
            return(
                <img src={this.state.src}/>
            )
        } else {
            return(
                <section>
                    <img src="./images/placeholder.png"/>
                </section>
            )
        }

    }
}
