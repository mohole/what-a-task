'use strict';
import React from 'react';

export default class Bottombar extends React.Component{
    constructor(){
        super();
        console.log('bottombar started');    
    }
	render(){
        return(
            <section>
			<div className="bottom-bar-wrapper">
				<div className="top-inner">
					<div className="col-xs-4">
						<a href="#" className="btn btn-primary"><i className="fa fa-search"></i></a>
					</div>
					<div className="col-xs-4 text-center">
						<a href="#" className="btn btn-primary"><i className="fa fa-user"></i></a>
					</div>
					<div className="col-xs-4 text-right">
						<a href="#" className="btn btn-primary"><i className="fa fa-cog"></i></a>
					</div>
				</div>
			</div>
			</section>
        )
    }
}