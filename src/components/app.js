'use strict';
import React from 'react';
import Spinner from './common/spinner';
import Topbar from './appbar/topbar';
import Bottombar from './appbar/bottombar';

export default class App extends React.Component{
    constructor(){
        super();
        console.log('app started');

	}
	render(){
        return(
            <section>
				<Topbar/>
				<Bottombar/>
			<Spinner/>
			</section>
        )
    }
}