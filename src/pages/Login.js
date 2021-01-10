import React from 'react';
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
            <div>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <h2>Log in to <Link to="/">Medbase</Link></h2>
    
                    <fieldset>
                        <legend>Log in with email &amp; password</legend>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" placeholder="email@server.com" name="email" type="email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password} />
                        </div>
                        <div>
                            {this.state.error ? (
                                <p>{this.state.error}</p>
                            ): null }
                            <button type="submit">Log In</button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Log in with Google</legend>
                        <button type="button" onClick={this.googleSignIn}>Sign In with Google</button>
                    </fieldset>

                </form>
            </div>
        )
    }
}