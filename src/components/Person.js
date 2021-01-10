import React from 'react';
import { Button, Confirm } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

export default class Person extends React.Component {


    constructor(props) {
        super(props);

        const currentUser = auth().currentUser;
        this.handleDelete = this.handleDelete.bind(this);
        this.path = `users/${currentUser.uid}/${this.props.person.key}`;

        this.state = {
            person: this.props.person,
            isEditing: false,
            confirmVisible: false
        }
    }

    handleChange = (e) => {
        let person = { ...this.state.person }
        person.name = e.target.value;
        // console.log(thePerson.name);
        
        this.setState({
            person
        });
    }

    handleEdit = (e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        // e.stopBubbling();

        this.setState({
            isEditing: !this.state.isEditing
        });

    }

    handleDelete(e) {
        e.preventDefault();
        this.setState({
            confirmVisible: true
        });
    }

    deleteItem = async () => {
        try {
            await db.ref(this.path).remove();
            this.setState({ confirmVisible: false });
        } catch(error) {
            console.log(error);
        }
    }

    handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await db.ref(this.path).update({
                name: this.state.person.name
            });
            this.setState({
                isEditing: false
            });
        } catch(error) {
            console.log(error);
        }

    }

    render() {

        return (
            <form onSubmit={ this.handleSave }  className={`person ${this.state.isEditing ? 'isEditing' : '' }`}>
                <span className="personName">
                    { this.state.isEditing ?
                        <input type="text" name="name" onClick={ (e) => { e.stopPropagation(); } } onChange={this.handleChange} value={this.state.person.name} />
                        :                        
                        this.state.person.name
                    }
                </span>

                <span className="personActions">
                    { this.state.isEditing ? 
                        <React.Fragment>
                            <Button type="submit" compact negative>Save</Button>
                            <Button compact onClick={ this.handleEdit }>Cancel</Button>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Button compact negative onClick={this.handleDelete}>Delete</Button>
                            <Button compact onClick={ this.handleEdit }>Edit</Button>
                        </React.Fragment>
                    }
                </span>
                <Confirm 
                    header='Warning!'
                    content='Are you sure you want to delete this user and all of their medications? This is not undoable.'
                    open={this.state.confirmVisible} 
                    onCancel={ () => { this.setState({confirmVisible: false})} } 
                    onConfirm={ this.deleteItem } 
                />
            </form>
        )

    }

}