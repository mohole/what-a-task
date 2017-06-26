'use strict';
import React from 'react';
import Imgblock from './../common/imgblock';
export default class UserList extends React.Component{
    constructor(props){
        super(props);
		this.state={
			usersList:this.props.usersList
		}
    }
	render(){
		if(this.state.usersList){
			const items = this.state.usersList.map((e,i) => {
        let hr= "";
          if(this.state.usersList.length>1 && i!=this.state.usersList.length-1){
            hr= <div className="hr"></div>
          }
				return(
					<section key={i}>
            <div className="container-user-list">
              <div className="mui-row">
    				<div className="mui-col-xs-2">
    					<a href="#" onClick={()=>{this.props.goToPage('Profile|'+e.id)}}>
    						<div className="img-utente">
    							<Imgblock mediaId={e.acf.user_image} elem="UserList" />
    						</div>
    					</a>
    				</div>

    				<div className="mui-col-xs-10">
    					<a href="#" onClick={()=>{this.props.goToPage('Profile|'+e.id)}}>
    						<span className="nome-utente">{e.name}</span>
    					</a>
    					<span className="corso-utente"></span>
    				</div>
				</div>
            </div>
            {hr}
          </section>
				)
			});
			  return(
					<div className="mui-container">
						{items}
					</div>
			)
		}else{
            return(
                <div>
                  <section className="spinner"><div className="vertical-center rotating inner-spinner"><i className="ion-load-c"></i></div></section>
                </div>
            )
        }


    }
}
