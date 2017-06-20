'use strict';
import React from 'react';
import ModifyProfile from './modify_profile';
import {Backend} from './../../backend';
import Imgblock from './../common/imgblock';
import Spinner from './../common/spinner';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditable: false,
            editActive: false,
            image_id: '',
            first_name: '',
            last_name: '',
            email: '',
            description: '',
            scuola: ''
        }
        Backend.getCategory()
				.then((data)=>{
					this.setState({
						listaScuole:data
					})
				})
    }

    undo(){
        this.editProfile();
        this.props.goToPage('Profile|'+localStorage.getItem('user_id'));
    }

    editProfile() {
        this.setState({
            editActive: !this.state.editActive
        })
    }

    getRuolo(){
        if(this.state.role=='2'){
            return 'Studente';
        } else if(this.state.role=='1'){
            return 'Docente';
        } else if(this.state.role=='3'){
            return 'Staff';
        }
    }

    componentWillMount() {
		console.log(this.props.profileId+' - '+this.props.currentId);
        if (this.props.profileId!=undefined && this.props.currentId!=undefined && this.props.profileId != this.props.currentId) {
            Backend.getUserInfo(this.props.profileId).then((data) => {
                this.setState({first_name: data.acf.user_firstname, last_name: data.acf.user_lastname, image_id: data.acf.user_image, email: data.acf.user_email, scuola:data.acf.user_scuola, description: data.description,role:data.acf.user_role})
            })
        } else {
            this.setState({
                image_id: localStorage.getItem('user_image'),
                first_name: localStorage.getItem('user_firstName'),
                last_name: localStorage.getItem('user_lastName'),
                email: localStorage.getItem('user_email'),
                role:localStorage.getItem('user_role'),
                description: localStorage.getItem('user_description'),
                scuola:localStorage.getItem('user_scuola'),
                isEditable:true
            })
			console.log('io');
        }
    }

    componentWillReceiveProps(nextProps) {
            if(nextProps.currentId==nextProps.profileId){
                this.setState({
                        image_id: localStorage.getItem('user_image'),
                        first_name: localStorage.getItem('user_firstName'),
                        last_name: localStorage.getItem('user_lastName'),
                        email: localStorage.getItem('user_email'),
                        role:localStorage.getItem('user_role'),
                        description: localStorage.getItem('user_description'),
                        scuola:localStorage.getItem('user_scuola'),
                        isEditable:true
                    })
                console.log('WillReceiveProps - IO')
            }else{
               Backend.getUserInfo(nextProps.profileId).then((data) => {
                    this.setState({first_name: data.acf.user_firstname, last_name: data.acf.user_lastname, image_id: data.acf.user_image, email: data.acf.user_email, scuola:data.acf.user_scuola, description: data.description,role:data.acf.user_role})
                }) 
            }
        
    }

    render() {
        let btnEdit = '';
        if (this.state.isEditable) {
            btnEdit = <button onClick={this.editProfile.bind(this)} className="mui-btn mui-btn--fab mui-btn--primary">+</button>;
        }

        if (this.state.editActive && this.state.isEditable && this.state.listaScuole) {
            return (<ModifyProfile
                    profileId={localStorage.getItem('user_id')}
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    image_id={this.state.image_id}
                    email={this.state.email}
                    description={this.state.description}
                    scuola={this.state.scuola}
                    listaScuole={this.state.listaScuole}
                    undo={this.undo.bind(this)}
                    goToPage={this.props.goToPage.bind(this)}
                />)
        } else {
            if (this.state.first_name != '') {
                return (
                    <section>
                        <div className="mui-container">
                            <div className="mui-row">
                                <div className="mui-col-xs-12">
                                    <Imgblock mediaId={this.state.image_id}/>
                                </div>
                                <div className="mui-col-xs-12">
                                    <h1>{this.state.first_name} {this.state.last_name}</h1>
                                </div>
                                <div className="mui-col-xs-12">
                                    <p>Mail: {this.state.email}</p>
                                    <p>Descrizione: {this.state.description}</p>
                                    <p>Ruolo: {this.getRuolo()}</p>
                                </div>
                                <div className="mui-col-xs-12">
                                    {btnEdit}
                                </div>
                            </div>
                        </div>
                    </section>
                )
            } else {
                return (<Spinner/>)
            }
        }
    }
}
