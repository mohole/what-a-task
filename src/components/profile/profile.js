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
    }

    undo(){
        this.editProfile();
        this.props.goToPage('Profile');
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
                this.setState({first_name: data.acf.user_firstname, last_name: data.acf.user_lastname, image_id: data.acf.user_image, email: data.acf.user_email, scuola:data.acf.user_scuola, description: data.description})
            })
        } else {
            this.setState({
                image_id: localStorage.getItem('user_image'),
                first_name: localStorage.getItem('user_firstName'),
                last_name: localStorage.getItem('user_lastName'),
                email: localStorage.getItem('user_email'),
				role:localStorage.getItem('user_role'),
                description: localStorage.getItem('user_description'),
				isEditable:true
            })
			console.log('io');
        }
    }

    componentWillReceiveProps() {
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
    }

    render() {
        let btnEdit = '';
        if (this.state.isEditable) {
            btnEdit = <button onClick={this.editProfile.bind(this)} className="button-modify mui-btn mui-btn--flat"><i className="icon-big ion-edit"></i></button>;
        }

        if (this.state.editActive && this.state.isEditable) {
            return (<ModifyProfile
                    profileId={localStorage.getItem('user_id')}
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    image_id={this.state.image_id}
                    email={this.state.email}
                    description={this.state.description}
                    scuola={this.state.scuola}
                    listaScuole={this.props.listaScuole}
                    undo={this.undo.bind(this)}
                    goToPage={this.props.goToPage.bind(this)}
                />)
        } else {
            if (this.state.first_name != '') {
                return (
                    <section className="container">
                    <section>
        
                        <div className="poster-utente">
                            <Imgblock mediaId={this.state.image_id}/>
                            <div className="mui-container">  
                                <div className="mui-row">
                                    {btnEdit}
                                </div>
                            </div>
                        </div>
                    </section>
                    
    <section>
        <div className="mui-container">
          <div className="mui-row">
            <div className="mui-col-xs-12">
              <div className="info-profilo">
                <span className="span-block my-span">Nome e Cognome</span>
                <span className="span-block">{this.state.first_name} {this.state.last_name}</span>
              </div>
              <div className="hr" />
              <div className="info-profilo">
                <span className="span-block my-span">Email</span>
                <span className="span-block">{this.state.email}</span>
              </div>
              <div className="hr" />
              <div className="info-profilo">
                <span className="span-block my-span">Ruolo</span>
                <span className="span-block">{this.getRuolo()}</span>
              </div>
              <div className="hr" />
              <div className="info-profilo">
                <span className="span-block my-span">Descrizione</span>
                <span className="span-block">{this.state.description}</span>
              </div>
                    
            </div>
          </div>
        </div>
</section>
                    </section>
                )
            } else {
                return (<Spinner/>)
            }
        }
    }
}