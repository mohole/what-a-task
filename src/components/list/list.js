'use strict';

import React from 'react';

export default class List extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const items = this.props.annunci.map((e,i) => {
        return(
          <a href={e.id}>
            <div className="mui-container" key={i}>
              <div className="mui-row">
                <div className="mui-col-xs-12">
                  <div><img src={e.image} /></div>
                  <h4><strong>{e.title}</strong></h4>
                  <p>{e.text}</p>
                </div>
              </div>
            </div>
          </a>
        )
        });
        return(
        <div>
            {items}
        </div>
        )
    }
}
