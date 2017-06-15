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
				return(
					<div key={i} >
						<div className="mui-row">
							<div className="mui-col-xs-2">
								<a href="#"  onClick={()=>{this.props.goToPage('Profile|'+e.id)}}>
									<div className="img-utente">
										<Imgblock mediaId={e.acf.user_image} />	
									</div>
								</a>
							</div>

							<div className="mui-col-xs-10">
								<a href="#"  onClick={()=>{this.props.goToPage('Profile|'+e.id)}}>
									<span className="nome-utente">{e.name}</span>
								</a>
								<span className="corso-utente"></span>
							</div>
						</div>
					</div>
				)
			});
			  return(
				<section>
					<div className="mui-container">
						{items}
					</div>
				</section>
			)
		}else{
            return(
                <div>
                    <p>TEST</p>
                </div>
            )
        }
		
      
    }
}

