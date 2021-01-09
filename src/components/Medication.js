import React from 'react';
import EasyEdit from 'react-easy-edit';
import { Button, Card } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

export default class Medication extends React.Component {

    FREQ_UNITS = ['daily','weekly','monthly','as needed'];

    constructor(props) {
        super(props);

        const {med} = this.props;

        this.path = `users/${auth().currentUser.uid}/${this.props.person.key}/meds/${med.key}`;
        console.log(this.path);

        this.state = {
            medication: med
        }
    }

    handleDelete = async (key) => {

        try {
            await db.ref(this.path).remove();
        } catch(error) {
            console.log(error);
        }

    }

    handleSave = async (key, value) => {
        console.log(key, value);
        const theMed = {...this.state.medication};
        theMed[key] = value;

        console.log(theMed);

        this.setState({
            medication: theMed
        }, async function() {
            try {
                console.log(this.state.medication);
                await db.ref(this.path).update(this.state.medication);
            } catch(error) {
                console.log(error);
            }        
        });

    }    

    render() {

        let unitOpts = [];
        this.FREQ_UNITS.forEach( unit => {
            unitOpts.push({label: unit, value: unit});
        });

        const { med } = this.props;
        return (
            <Card.Content>
                <Card.Header>
                    <EasyEdit
                        type="text"
                        onSave={ (val) => { this.handleSave('name', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "name" }}
                        placeholder='Medication Name'
                        value={med.name}
                        saveOnBlur
                    />       

                    <span className="right floated">
                        <EasyEdit
                            type="text"
                            onSave={ (val) => { this.handleSave('strength', val); } }
                            onCancel={ () => {} }
                            attributes={{name: "strength" }}
                            placeholder='Strength'
                            value={med.strength}
                            saveOnBlur
                        />
                    </span>                
                </Card.Header>

                <Card.Description>
                    <EasyEdit
                        type="number"
                        onSave={ (val) => { this.handleSave('frequencyAmt', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "frequenceyAmt" }}
                        placeholder='Frequency'
                        value={med.frequencyAmt}
                        saveOnBlur
                        attributes={{"min": 1}}
                    />
                    &nbsp;
                    <EasyEdit
                        type="select"
                        onSave={ (val) => { this.handleSave('frequencyUnit', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "frequencyUnit" }}
                        options={unitOpts}
                        placeholder="per..."
                        value={med.frequencyUnit}
                        saveOnBlur
                    />                       

                    <span className="right floated">
                        <i className="user icon"></i> 
                        <EasyEdit
                            type="text"
                            onSave={ (val) => { this.handleSave('doctor', val); } }
                            onCancel={ () => {} }
                            attributes={{name: "doctor" }}
                            placeholder='Doctor'
                            value={med.doctor}
                            saveOnBlur
                        />
                    </span>
                </Card.Description>
                <Card.Meta>
                    <EasyEdit
                        type="text"
                        onSave={ (val) => { this.handleSave('notes', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "notes" }}
                        placeholder='Notes'
                        value={med.notes}
                        saveOnBlur
                    />
                </Card.Meta>

                <Button compact negative floated='right' onClick={this.handleDelete}>Delete</Button>

            </Card.Content>

        );
    }

}