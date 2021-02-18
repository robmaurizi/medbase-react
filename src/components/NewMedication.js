import React from 'react';
import { Button, Card } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

export default class NewMedication extends React.Component {

    FREQ_UNITS = ['daily','weekly','monthly','as needed'];

    constructor(props) {
        super(props);

        this.path = `users/${auth().currentUser.uid}/${this.props.person.key}`;

        this.emptyMed = {name: '', strength: '', frequencyAmt: '', frequencyUnit: this.FREQ_UNITS[0], doctor: '', notes: ''};


        this.state = {
            person: this.props.person,
            medication: this.emptyMed,
            isEditing: false
        }

    }

    handleChange = (e) => {
        const key = e.target.name;
        const val = e.target.value;
        
        let theMed = {...this.state.medication};
        theMed[key] = val;
        this.setState({
            medication: theMed
        });

    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newMedRef = await db.ref(`${this.path}/meds`).push();
            newMedRef.set(this.state.medication);
            this.setState({medication: this.emptyMed, isEditing: false });
        } catch(error) {
            console.log(error.message);
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.setState({
            isEditing: !this.state.isEditing,
            medication: this.emptyMed
        });
    }    

    render() {

        const { medication } = this.state;

        let unitOpts = [];
        this.FREQ_UNITS.forEach( unit => {
            unitOpts.push({label: unit, value: unit});
        });

        return (

            (this.state.isEditing) ?
                <Card.Content>
                    <form onSubmit={this.handleSubmit} className="medication isEditing">
                    <div className="medContent">
                        <Card.Header>
                            <div className="medHeader">
                                <span className="medName">
                                    <input placeholder="Medication Name" name="name" type="text" value={medication.name} onChange={ this.handleChange } /> 
                                </span>
                                <span className="right floated medStrength">
                                    <input placeholder="Strength" name="strength" type="text" value={medication.strength} onChange={ this.handleChange } /> 
                                </span>     
                            </div>
                        </Card.Header>

                        <Card.Description className="medDescription">
                            <div className="medFrequency">
                                <span className="medFrequencyAmt">
                                    <input placeholder="Frequency" name="frequencyAmt" type="number" min="1" value={medication.frequencyAmt} onChange={ this.handleChange } /> 
                                </span>
                                &nbsp;
                                <span className="medFrequencyUnit">
                                    <select name="frequencyUnit" onChange={this.handleChange}>
                                        <option value="">per...</option>
                                        { unitOpts.map( opt => {
                                            return <option key={opt.value} value={opt.value}>{ opt.label }</option>
                                        })}
                                    </select>
                                </span>
                            </div>
                            <span className="medDoctor">
                                <input placeholder="Doctor" name="doctor" type="text" value={medication.doctor} onChange={ this.handleChange } /> 
                            </span>
                        </Card.Description>
                        <Card.Meta className="medNotes">
                            <input placeholder="notes" name="notes" type="text" value={medication.notes} onChange={ this.handleChange } /> 
                        </Card.Meta>
                    </div>
                    <div className="medActions">
                        <React.Fragment>
                            <Button compact onClick={ this.handleCancel }>Cancel</Button>
                            <Button type="submit" compact primary>Save</Button>
                        </React.Fragment>
                    </div>
                    </form>
                
                </Card.Content>

            : 

            <Card.Content className="medication addNewMed">
                <Button compact onClick={ this.handleCancel }>Add New Medication</Button>
            </Card.Content>

                         
        );

        
    }


}