import React from 'react';
import EasyEdit from 'react-easy-edit';
import { Button } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

export default class Person extends React.Component {


    constructor(props) {
        super(props);

        const currentUser = auth().currentUser;
        this.handleDelete = this.handleDelete.bind(this);
        this.path = `users/${currentUser.uid}/${this.props.person.key}`;

        this.state = {
            person: this.props.person
        }
    }

    async handleDelete(event) {
        event.preventDefault();

        try {
            await db.ref(this.path).remove();
        } catch(error) {
            console.log(error);
        }
    }

    handleSave = async (val) => {

        try {
            await db.ref(this.path).update({
                name: val
            });
        } catch(error) {
            console.log(error);
        }

    }

    render() {

        return (
            <React.Fragment>
                    <EasyEdit
                        type="text"
                        onSave={ this.handleSave }
                        onCancel={ () => {} }
                        attributes={{name: "personName" }}
                        value={ this.state.person.name }
                        saveOnBlur
                    />
                    <Button compact negative floated='right' onClick={this.handleDelete}>Delete</Button>

            </React.Fragment>
        )

    }

}