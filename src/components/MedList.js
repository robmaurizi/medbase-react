import React from 'react';
import { Button, Card } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

import Medication from './Medication';
import NewMedication from './NewMedication';

export default class MedList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            meds: [],
            readError: null,
            writeError: null
        };

        this.path = `users/${auth().currentUser.uid}/${this.props.person.key}/meds/`;

    }

    async componentDidMount() {
        this.setState( { readError: null } );

        try {
            db.ref(this.path).on('value', snapshot => {
                let meds = [];
                snapshot.forEach( snap => {
                    const theMed = { key: snap.ref.path.pieces_[snap.ref.path.pieces_.length -1 ], ...snap.val() }
                    meds.push(theMed);
                });

                this.setState({ meds });
            });
        } catch(error) {
            this.setState({readError: error.message});
        }
    }


    render() {
        return (
            <Card.Group>
                { this.state.meds.map( med => {
                    return <Card key={med.key}><Medication med={med} person={this.props.person} /></Card>
                })}            
                <Card key="newMed"><NewMedication person={this.props.person} /></Card>
            </Card.Group>
        );
    }

}