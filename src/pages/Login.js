import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { signin, signInWithGoogle } from '../helpers/auth';

export default class Login extends React.Component {
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
            await signin(this.state.email, this.state.password);
        } catch(error) {
            this.setState({error: error.message});
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
                <div className="account-header">
                    <h2>Log in to MedBase</h2>
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link>!</p>
                </div>

                <div className="account-forms">

                    <fieldset className="login-container">
                        <legend>Log in with email &amp; password</legend>
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
                            <Button primary type="submit">Log In</Button>
                        </div>
                    </fieldset>

                    <fieldset className="login-container">
                        <legend>Log in with your Google account</legend>
                        <Button type="button" color="red" onClick={this.googleSignIn}>
                            <Icon name="google" /> &nbsp; Sign In with Google
                        </Button>
                    </fieldset>
                    
                </div>

            </Form>
        )
    }
}