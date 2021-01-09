import React from 'react';
import EasyEdit from 'react-easy-edit';
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
            medication: this.emptyMed
        }

    }

    handleSave = (key, value) => {
        // console.log(key, value);
        const theMed = {...this.state.medication};
        // const key = event.target.name;
        // const value = event.target.value;
        theMed[key] = value;

        this.setState({
            medication: theMed
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newMedRef = await db.ref(`${this.path}/meds`).push();
            newMedRef.set(this.state.medication);
            this.setState({medication: this.emptyMed });
        } catch(error) {
            console.log(error.message);
        }
    }

    render() {

        const { medication } = this.state;
        // console.log(medication);

        let unitOpts = [];
        this.FREQ_UNITS.forEach( unit => {
            unitOpts.push({label: unit, value: unit});
        });

        return (

            <Card.Content>
                <Card.Header>
                    <EasyEdit
                        type="text"
                        onSave={ (val) => { this.handleSave('name', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "name" }}
                        placeholder='Add Medication'
                        saveOnBlur
                        value={this.state.medication.name}
                    />       

                    <span className="right floated">
                        <EasyEdit
                            type="text"
                            onSave={ (val) => { this.handleSave('strength', val); } }
                            onCancel={ () => {} }
                            attributes={{name: "strength" }}
                            placeholder='Strength'
                            saveOnBlur
                            value={this.state.medication.strength}
                        />
                    </span>                
                </Card.Header>

                <Card.Description>
                    <EasyEdit
                        type="number"
                        onSave={ (val) => { this.handleSave('frequencyAmt', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "frequenceyAmt", "min": 1 }}
                        placeholder='Frequency'
                        saveOnBlur
                        value={this.state.medication.frequencyAmt}
                    />
                    &nbsp;
                    <EasyEdit
                        type="select"
                        onSave={ (val) => { this.handleSave('frequencyUnit', val); } }
                        onCancel={ () => {} }
                        attributes={{name: "frequencyUnit" }}
                        options={unitOpts}
                        placeholder="per..."
                        saveOnBlur
                        value={this.state.medication.frequencyUnit}
                    />                       

                    <span className="right floated">
                        <i className="user icon"></i> 
                        <EasyEdit
                            type="text"
                            onSave={ (val) => { this.handleSave('doctor', val); } }
                            onCancel={ () => {} }
                            attributes={{name: "doctor" }}
                            placeholder='Doctor'
                            saveOnBlur
                            value={this.state.medication.doctor}
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
                        saveOnBlur
                        value={this.state.medication.notes}
                    />
                </Card.Meta>

                <Button compact primary floated='right' onClick={this.handleSubmit}>Save</Button>
                
            </Card.Content>
                         
        );

        // return(
        //     <div>
        //         <h2>Add Medication</h2>
        //         <form className="ui form" onSubmit={this.handleSubmit}>
        //             <div className="field">
        //                 <label>Medication Name</label>
        //                 <input type="text" name="name" onChange={this.handleChange} value={medication.name} />
        //             </div>

        //             <div className="field">
        //                 <label>Strength</label>
        //                 <input type="text" name="strength" onChange={this.handleChange} value={medication.strength} />
        //             </div>

        //             <div className="field">
        //                 <label>Frequency</label>
        //                 <div className="two fields">
        //                     <div className="field">
        //                         <input type="number" min="1" step="1" name="frequencyAmt" onChange={this.handleChange} value={medication.frequencyAmt} />
        //                     </div>
        //                     <div className="field">
        //                         <select name="frequencyUnit" className="ui fluid dropdown" onChange={this.handleChange} value={medication.frequencyUnit}>
        //                             { this.FREQ_UNITS.map( unit => {
        //                                 return (this.state.medication.frequencyUnit === unit ) ? (<option key={unit} value={unit} selected>{ unit }</option>) : (<option key={unit} value={unit}>{unit}</option>)
        //                             })
        //                         }
        //                         </select>
        //                     </div>
        //                 </div>
        //             </div>

        //             <div className="field">
        //                 <label>Doctor</label>
        //                 <input type="text" name="doctor" onChange={this.handleChange} value={medication.doctor} />
        //             </div>

        //             <div className="field">
        //                 <label>Notes</label>
        //                 <textarea name="notes" onChange={this.handleChange} value={medication.notes}></textarea>
        //             </div>

        //             <div className="field">
        //                 <button type="submit" className="ui primary basic button">Add Medication</button>
        //             </div>

        //         </form>
        //     </div>
        // )
    }


}