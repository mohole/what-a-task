'use strict';
import React from 'react';
import {Backend} from './../../backend';
import EditItem from './edit-item';
import Spinner from './../common/spinner';

export default class Single extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditable: true,
            editActive: false,
            annuncio: this.props.annuncio,
            postCategory: [],
            userId: 6,
            currentCat:{}
        }
    }

    editItem() {
        this.setState({
            editActive: !this.state.editActive
        })
    }

    isAuthor(userId, authorId) {
        if (userId === authorId) {
            return <button onClick={() => {
                this.editItem()
            }}>MODIFICA</button>;
        }
    }

    printDate(date) {
        var year = date.substr(0, 4);
        var month = date.substr(5, 2);
        var day = date.substr(8, 2);
        return (day + '/' + month + '/' + year);
    }

componentWillMount(){

        Backend.getCategory().then((data) => {
            this.setState({postCategory: data})
        })

        const authorId = this.state.annuncio.author;
        Backend.getUserInfo(authorId).then((data) => {
            this.setState({author: data})
        });

        Backend.getCurrentCategoryName(this.state.annuncio.tags[0]).then((data) => {
            this.setState({currentCat: data.name})
        })
}

    render() {
console.log('single');
            if (this.state.author && this.state.currentCat) {

                if (this.state.editActive && this.state.isEditable) {
                    return (
                        <EditItem id={this.state.annuncio.id} type={this.state.annuncio.categories} text={this.state.annuncio.content.rendered} title={this.state.annuncio.title.rendered} image={this.state.annuncio.acf.url_img} type={this.state.annuncio.categories} selectedCat={this.state.annuncio.tags} categoryList={this.state.postCategory}/>
                    )
                } else {
                    return (
                        <section>
                            <div className="mui-container content">
                                <div className="mui-row">
                                    <div className="mui-col-xs-12">
                                        <h2>{this.state.annuncio.title.rendered.charAt(0).toUpperCase() + this.state.annuncio.title.rendered.slice(1)}</h2>
                                        <small>Categoria:
                                            <a href="#">{this.state.currentCat}
                                            </a>
                                        </small>
                                        {this.isAuthor(this.state.userId, this.state.author.id)}
                                    </div>
                                </div>
                                <div className="mui-row">
                                    <div className="mui-col-xs-12">
                                        <img src={this.state.annuncio.acf.url_img} className="img img-fluid"/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="mui-row">
                                    <div className="mui-col-xs-12">
                                        <p>{this.state.annuncio.content.rendered}</p>
                                        <button className="mui-btn mui-btn--primary">Contatta</button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="mui-row">
                                    <div className="mui-col-xs-12">
                                        <p>Creato da
                                            <a href="#"> {this.state.author.name} </a>
                                            il {this.printDate(this.state.annuncio.date)}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
            }else {
            return (<Spinner/>)
        }
    }
}
