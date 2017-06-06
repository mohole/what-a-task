'use strict';

import React from 'react';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';

export default class Userbar extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:''
        }
	}

    componentWillMount(){
        Backend.getUserInfo(this.props.userId).then((data)=>{
            this.setState({
                name:data.name,
                image:data.acf.user_image
            })
        })
    }

    render(){
        if(this.state.name!=''){
            return(
                <div className="mui-col-xs-2">
                <a href="#"  onClick={()=>{this.props.goToPage('Profile|'+this.props.userId)}}>
                    <Imgblock className="img-utente" mediaId={this.state.image} /><span>{this.state.name}</span></a>
                </div>
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