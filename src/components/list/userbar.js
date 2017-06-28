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

        Backend.getCurrentCategoryName(this.props.category).then((data) => {
            this.setState({currentCat: data.name})
        });
    }

    componentWillReceiveProps(nextProps){
        Backend.getUserInfo(nextProps.userId).then((data)=>{
            this.setState({
                name:data.name,
                image:data.acf.user_image
            })
        })

        Backend.getCurrentCategoryName(nextProps.category).then((data) => {
            this.setState({currentCat: data.name})
        });
    }
    render(){
        if(this.state.name!=''){
            if(this.props.hidename){

                return(
                    <section>
                        <div className="mui-col-xs-12">
                            <span className="corso-utente">{this.state.currentCat}</span>
                        </div>
                    </section>
                )
            } else {
                return(
                    <section>

                        <div className="mui-col-xs-2">
                            <a href="#"  onClick={()=>{this.props.goToPage('Profile|'+this.props.userId)}}>
                                <div className="img-utente">
                                    <Imgblock mediaId={this.state.image} elem="UserBar"/>
                                </div>
                            </a>
                        </div>
                        <div className="mui-col-xs-10">
                            <a href="#"  onClick={()=>{this.props.goToPage('Profile|'+this.props.userId)}}>
                                <span className="nome-utente">{this.state.name}</span>
                            </a>
                            <span className="corso-utente">{this.state.currentCat}</span>
                        </div>

                    </section>
                )
            }

        } else {
            return(
                <section>
                    <i className="fa fa-spinner fa-spin"></i>
                </section>
            )
        }

    }
}
