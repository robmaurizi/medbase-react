import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'

import { auth, db } from '../services/firebase';

import Person from '../components/Person';
import MedList from '../components/MedList';

export default class PeopleList extends React.Component {

    constructor() {
        super();

        this.emptyPerson = {key: '', name: '', meds: []};

        this.state = {
            user: auth().currentUser,
            people: [],
            newPerson: this.emptyPerson,
            readError: null,
            writeError: null,
            activeIndex: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        
        this.path = `users/${this.state.user.uid}`;

    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    handleChange(event) {
        const newPerson = { 'name': event.target.value }
        this.setState({
            newPerson
        });
    }

    async handleSubmit(event) {


        event.preventDefault();
        this.setState({writeError: null});

        if (this.state.newPerson.name === '') return;

        try {
            const newPersonRef = await db.ref(this.path).push();
            newPersonRef.set(this.state.newPerson);
            this.setState({newPerson: this.emptyPerson});
        } catch(error) {
            this.setState({writeError: error.message});
        }
    }

    async componentDidMount() {
        this.setState( { readError: null } );

        try {
            db.ref(this.path).on('value', snapshot => {
                let people = [];
                snapshot.forEach( snap => {
                    const thePerson = { key: snap.ref.path.pieces_[snap.ref.path.pieces_.length -1 ], ...snap.val() }
                    people.push(thePerson);
                });

                this.setState({ people });
            });
        } catch(error) {
            this.setState({readError: error.message});
        }
    }

    render() {

        const { activeIndex } = this.state

        return (
            <div className="ui container">
                <Accordion fluid styled>
                    { this.state.people.map( (person, i) => {
                        return (
                            <React.Fragment key={person.key}>
                                <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    <Person person={person} />
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === i}>
                                    <MedList person={person} />
                                </Accordion.Content>
                            </React.Fragment>
                        );
                    })}

                </Accordion>

                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field ui input">
                        <input type="text" placeholder="Jane Doe" name="newPerson" id="newPerson" value={this.state.newPerson.name} onChange={this.handleChange} />
                        { this.state.error ? <p>{this.state.writeError}</p> : null }
                    </div>
                    <button type="submit" className="ui primary basic button">Add Person</button>
                </form>
            </div>
        );
    }

}
