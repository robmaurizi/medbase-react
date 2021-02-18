import React from 'react';
import { Button, Card, Confirm } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

export default class Medication extends React.Component {

    FREQ_UNITS = ['daily','weekly','monthly','as needed'];

    constructor(props) {
        super(props);

        const {med} = this.props;

        this.path = `users/${auth().currentUser.uid}/${this.props.person.key}/meds/${med.key}`;

        this.state = {
            medication: med,
            isEditing: false,
            backupMed: med,
            confirmVisible: false
        }
    }

    deleteItem = async () => {

        try {
            await db.ref(this.path).remove();
        } catch(error) {
            console.log(error);
        }

    }

    handleDelete = async (e) => {
        e.preventDefault();
        this.setState({
            confirmVisible: true
        });
    }

    handleSave = async (e) => {
        e.preventDefault();
        this.setState({
            isEditing: false
        });

        try {
            await db.ref(this.path).update(this.state.medication);
        } catch(error) {
            console.log(error);
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

    handleEdit = (e) => {
        e.preventDefault();

        this.setState({
            isEditing: !this.state.isEditing,
            backupMed: this.state.medication
        });

    }

    handleCancel = (e) => {
        e.preventDefault();

        this.setState({
            isEditing: false,
            medication: this.state.backupMed

        });
    }

    render() {

        let unitOpts = [];
        this.FREQ_UNITS.forEach( unit => {
            unitOpts.push({label: unit, value: unit});
        });

        const { medication } = this.state;
        return (
            <Card.Content>
                <form onSubmit={ this.handleSave } className={ this.state.isEditing ? 'medication isEditing' : 'medication' }>
                <div className="medContent">
                    <Card.Header>
                        <div className="medHeader">
                            <span className="medName">
                                { ( this.state.isEditing ) ? 
                                    <input placeholder="Medication Name" name="name" type="text" value={medication.name} onChange={ this.handleChange } /> 
                                    : 
                                    medication.name 
                                }
                            </span>
                            <span className="right floated medStrength">
                                { ( this.state.isEditing ) ? 
                                    <input placeholder="Strength" name="strength" type="text" value={medication.strength} onChange={ this.handleChange } /> 
                                    : 
                                    medication.strength
                                }
                            </span>     
                        </div>
                    </Card.Header>

                    <Card.Description className="medDescription">
                        <div className="medFrequency">
                            <span className="medFrequencyAmt">
                            { ( this.state.isEditing ) ? 
                                <input placeholder="Frequency" name="frequencyAmt" type="number" min="1" value={medication.frequencyAmt} onChange={ this.handleChange } /> 
                                : 
                                medication.frequencyAmt
                            }
                            </span>
                            &nbsp;
                            <span className="medFrequencyUnit">
                            { ( this.state.isEditing ) ? 
                                <select name="frequencyUnit" onChange={this.handleChange} value={medication.frequencyUnit}>
                                    <option value="">per...</option>
                                    { unitOpts.map( opt => {
                                        return<option key={opt.value} value={opt.value}>{ opt.label }</option>
                                    })}
                                </select>
                                : 
                                medication.frequencyUnit
                            }
                            </span>
                        </div>
                        <span className="medDoctor">
                            { ( this.state.isEditing ) ? 
                                <input placeholder="Doctor" name="doctor" type="text" value={medication.doctor} onChange={ this.handleChange } /> 
                                : 
                                <React.Fragment>
                                    { (medication.doctor) ? <i className="user icon"></i> : null }
                                    {medication.doctor}
                                </React.Fragment>
                            }
                        </span>
                    </Card.Description>
                    <Card.Meta className="medNotes">
                        { ( this.state.isEditing ) ? 
                                <input placeholder="notes" name="notes" type="text" value={medication.notes} onChange={ this.handleChange } /> 
                                : 
                                medication.notes
                            }
                    </Card.Meta>
                </div>
                <div className="medActions">
                { (this.state.isEditing) ? 
                    <React.Fragment>
                        <Button type="submit" compact primary onClick={ this.handleSave }>Save</Button>
                        <Button compact onClick={ this.handleCancel }>Cancel</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Button compact negative onClick={this.handleDelete}>Delete</Button>
                        <Button compact onClick={ this.handleEdit }>Edit</Button>
                    </React.Fragment>
                }
                </div>
                </form>
                <Confirm 
                    header='Warning!'
                    content='Are you sure you want to delete this medication? This is not undoable.'
                    open={this.state.confirmVisible} 
                    onCancel={ () => { this.setState({confirmVisible: false})} } 
                    onConfirm={ this.deleteItem } 
                />
               
            </Card.Content>

        );
    }

}