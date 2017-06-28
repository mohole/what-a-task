'use strict';
import React from 'react';
import {Backend} from './../../backend';
import EditItem from './edit-item';
import Spinner from './../common/spinner';
import Imgblock from './../common/imgblock';

export default class Single extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditable: true,
            editActive: false,
            annuncio: this.props.annuncio,
            postCategory: [],
            imageUrl:'',
            currentCat:{}
        }

    }

    editItem(){
        this.setState({
            editActive: !this.state.editActive
        })
    }

    undo(){
        Backend.getAnnuncio(this.props.id)
        .then((data)=>{
            this.setState({
                annuncio:data
            })
        })
        this.setState({
            editActive: !this.state.editActive
        });
    }

    isAuthor(userId, authorId) {
        if (userId == authorId) {
            return <button className="my-button mui-col-xs-12 mui-btn mui-btn--danger" onClick={() => {
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

        Backend.getAnnuncio(this.props.id)
        .then((data)=>{
            this.setState({
                annuncio:data
            })
        });

        Backend.getCategory().then((data) => {
            this.setState({postCategory: data})
        });

        const authorId = this.state.annuncio.author;
        Backend.getUserInfo(authorId).then((data) => {
            this.setState({author: data})
        });

        Backend.getCurrentCategoryName(this.state.annuncio.tags[0]).then((data) => {
            this.setState({currentCat: data.name})
        });

        /*Backend.getMedia(this.state.annuncio.featured_media).then((data)=>{
            this.setState({imageUrl:data.media_details.sizes.watSize.source_url})
        });*/
}
    render() {
            console.log('single');
            if (this.state.author && this.state.currentCat) {

                if (this.state.editActive && this.state.isEditable) {
                    return (
                        <EditItem id={this.state.annuncio.id}
                        type={this.state.annuncio.categories}
                        text={this.state.annuncio.content.rendered}
                        title={this.state.annuncio.title.rendered}
                        image={this.state.annuncio.featured_media}
                        imageUrl={this.state.imageUrl}
                        type={this.state.annuncio.categories}
                        selectedCat={this.state.annuncio.tags}
                        categoryList={this.state.postCategory}
                        undo={this.undo.bind(this)}
                        goToPage={this.props.goToPage.bind(this)} />
                    )
                } else {
                    return (
                        <section>
                          <div className="poster-annuncio">
                            <Imgblock mediaId={this.state.annuncio.featured_media}/>
                            <div className="info-utente">
                                <div className="inner-info-utente">
                                <span className="nome-utente">{this.state.author.name}</span>
                                <span className="corso-utente">{this.state.currentCat}</span>
                                <span>pubblicato il {this.printDate(this.state.annuncio.date)}</span>
                                </div>
                            </div>
                          </div>

                          <div className="mui-container">
                          <div className="mui-row">
                          <div className="mui-col-xs-12">
                          <span className="titolo-annuncio">{this.state.annuncio.title.rendered.charAt(0).toUpperCase() +     this.state.annuncio.title.rendered.slice(1)}</span>
                          </div>
                          <div className="mui-col-xs-12">
                          <p className="descrizione-annuncio">{this.state.annuncio.content.rendered}</p>
                          {this.isAuthor(this.props.userId, this.state.author.id)}
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
