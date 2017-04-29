'use strict';
import React from 'react';

export default class Topbar extends React.Component{
    constructor(){
        super();
        console.log('topbar started');    
    }
	render(){
        return(
            <section>
			<div className="top-bar-wrapper">
				<div className="top-inner">
					<div className="col-xs-4">
						<a href="#" className="btn btn-primary"><i className="fa fa-plus"></i></a>
					</div>
					<div className="col-xs-4 text-center">WAT</div>
					<div className="col-xs-4">
						<a href="" id="search" className="btn btn-primary"><i className="fa fa-search"></i></a>
					</div>
				</div>
			</div>
			</section>
        )
    }
}