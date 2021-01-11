import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Icon } from 'semantic-ui-react';

import { signup, signInWithGoogle } from '../helpers/auth';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        this.setState({error: ''});
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({error: error.message });
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>

                <h2>Create an account</h2>
                <p>Already have an account? <Link to="/login">Log in here</Link>!</p>
                <fieldset>
                    <legend>Create an account with email &amp; password</legend>
                    <div className="formRow">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" placeholder="email@server.com" name="email" type="email" onChange={this.handleChange} value={this.state.email} />
                    </div>
                    <div className="formRow">
                        <label htmlFor="password">Password</label>
                        <input id="password" placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password} />
                    </div>
                    <div className="formRow">
                        {this.state.error ? (
                            <p>{this.state.error}</p>
                        ): null }
                        <Button primary type="submit">Sign Up</Button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Sign up with your Google account</legend>
                    <Button type="button" color="red" onClick={this.googleSignIn}>
                        <Icon name='google' fitted /> &nbsp; Sign Up with Google
                    </Button>

                </fieldset>

            </Form>

        )
    }


}