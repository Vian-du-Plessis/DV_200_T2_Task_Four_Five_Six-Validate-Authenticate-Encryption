import React, { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';


import Input from '../Components/Input';
import LabelIcon from '../Components/LabelIcon';
import axios from 'axios';
import Button from '../Components/Button';

const Register = () => {

    const navigate = useNavigate();

    const [ inputs, setInputs ] = useState( {
        first: '',
        last: '',
        email: '',
        username: '',
        contact: '',
        password: '',
        passwordCon: '',
    } );

    const [ errorMessages, setErrorMessages ] = useState( {
        first: 'Please provide your first name',
        firstErrorShow: false,
        last: 'Please provide your last name',
        lastErrorShow: false,
        email: 'Please provide your email',
        emailErrorShow: false,
        emailAvailIcon: "invalid",
        emailAvailIconShow: false,
        username: 'Please provie a username',
        usernameErrorShow: false,
        usernameAvailIcon: 'invalid',
        usernameAvailIconShow: false,
        contact: 'Please provide your number',
        contactErrorShow: false,
        password: 'Password does not meet the criteria',
        passwordErrorShow: false,
        passwordCon: "Passwords don't match",
        passwordConErrorShow: false

    } );

    const [ passMatch, setPassMatch ] = useState( {
        lowercase: false,
        uppercase: false,
        digit: false,
        special: false,
        length: false
    } );

    const firstVal = ( e ) => {
        const value = e.target.value;
        setInputs( { ...inputs, first: value } );
        if( inputs.first !== '' ) {
            setErrorMessages( {...errorMessages, firstErrorShow: false } );
        }
    }

    const lastVal = ( e ) => {
        const value = e.target.value;
        setInputs( { ...inputs, last: value } );
        if( inputs.last !== '' ) {
            setErrorMessages( {...errorMessages, lastErrorShow: false } );
        }

    }

    const emailVal = ( e ) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        const value = e.target.value;
        setInputs( { ...inputs, email: value } );

        if( inputs.email !== '' ) {
            setErrorMessages( { ...errorMessages, emailErrorShow: false } );
        }

        if( !value.match(emailRegex) ) {
            setErrorMessages( { ...errorMessages, email: 'Email is not a valid format' } );
            setErrorMessages( { ...errorMessages, emailErrorShow: true } );
        }
    }

    const validateEmail = () => {
        axios.post( 'http://localhost/ServerSide/authenticateEmail.php', inputs )
        .then( (res) => {
        console.log(res)

            if( res.data === 'Available' ) {
                setErrorMessages( error => ({...error, emailAvailIcon: 'valid'}) );
                setErrorMessages( error => ({...error, emailAvailIconShow: true}) );
                console.log(errorMessages);
            } else if( res.data === 'Not Available' ) {
                setErrorMessages( error => ({...error, emailAvailIcon: 'invalid'}) );
                setErrorMessages( error => ({...error, emailAvailIconShow: true}) );
                setErrorMessages( error => ({...error, emailErrorShow: true}) );
                setErrorMessages( error => ({...error, email: 'Email is not available'}) );
                console.log(errorMessages);
            } else if( res.data === '' ) {
                setErrorMessages( error => ({...error, emailAvailIconShow: false}) );
                setErrorMessages( error => ({...error, emailErrorShow: false}) );
            }
        })
    }

    const usernameVal = ( e ) => {
        const value = e.target.value.trim();
        setInputs( { ...Input, username: value } );
        if( inputs.username !== '' ) {
            setErrorMessages( {...errorMessages, usernameErrorShow: false } );
        }
    }

    const validateUser = () => {
        axios.post( 'http://localhost/ServerSide/authenticateUser.php', inputs )
        .then( ( res ) => {
            console.log(res);
            if( res.data === 'Available' ) {
                setErrorMessages( error => ({...error, usernameAvailIcon: 'valid'}) );
                setErrorMessages( error => ({...error, usernameAvailIconShow: true}) );
            } else if( res.data === 'Not Available' ) {
                setErrorMessages( error => ({...error, usernameAvailIcon: 'invalid'}) );
                setErrorMessages( error => ({...error, usernameAvailIconShow: true}) );
                setErrorMessages( error => ({...error, usernameErrorShow: true}) );
                setErrorMessages( error => ({...error, username: 'Username is not available'}) );
            } else if( res.data === '' ) {
                setErrorMessages( error => ({...error, usernameAvailIconShow: false}) );
                setErrorMessages( error => ({...error, usernameErrorShow: false}) );
            }
        } );
    }

    const contactVal = ( e ) => {
        const contactRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

        const value = e.target.value;
        setInputs({...inputs, contact: value});
        if( inputs.contact !== '' ) {
            setErrorMessages( error => ({...error, contactErrorShow: false}) );
        }

        if( !value.match( contactRegex ) ) {
            setErrorMessages( error => ({...error, contact: 'This is not a phone number'}) );
            setErrorMessages( error => ({...error, contactErrorShow: true}) );
        }
    }

    const passwordVal = ( e ) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;

        const value = e.target.value;
        console.log("🚀 ~ file: Register.js ~ line 151 ~ passwordVal ~ value", value)
        setInputs( {...inputs, password: value })
        if( inputs.password !== '' ) {
            setErrorMessages( error => ({...error, passwordErrorShow: false}) );
        }

        if( !value.match(passwordRegex)) {
            setErrorMessages( error => ({...error, password: 'Password does not meet criteria'}) );
            setErrorMessages(  {...errorMessages, passwordErrorShow: true});
            console.log(errorMessages)
        }

        if( value.length >= 5 ) {
            setPassMatch( match => ({...match, length: true}))
        } else {
            setPassMatch( match => ({...match, length: false}))
        }

        if( value.search(/[a-z]/) < 0 ) {
            setPassMatch( match => ({...match, lowercase: false}))
        } else {
            setPassMatch( match => ({...match, lowercase: true}))
        }

        if( value.search(/[A-Z]/) < 0 ) {
            setPassMatch( match => ({...match, uppercase: false}))
        } else {
            setPassMatch( match => ({...match, uppercase: true}))
        }

        if( value.search(/[0-9]/) < 0 ) {
            setPassMatch( match => ({...match, digit: false}))
        } else {
            setPassMatch( match => ({...match, digit: true}))
        }

        const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if( special.test(value) ) {
            setPassMatch( match => ({...match, special: true}))
        } else {
            setPassMatch( match => ({...match, special: false}))
        }
    }

    const passwordConVal = ( e ) => {
        const value = e.target.value;

        setInputs( { ...inputs, passwordCon: value } );
        if( inputs.password === value ) {
            setErrorMessages( {...errorMessages, passwordConErrorShow: false} )
            console.log(errorMessages)
        } else {
            setErrorMessages(errorMessages => ({...errorMessages, passwordConErrorShow: true}))
            setErrorMessages(errorMessages => ({...errorMessages, passwordCon: 'Your passwords does not match'}))
        }
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log(inputs);

        if( inputs.first === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, first: 'What is your name' }));
            setErrorMessages(errorMessages => ({ ...errorMessages, firstErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, firstErrorShow: false }));
        }

        if( inputs.last === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, last: 'What is your name' }));
            setErrorMessages(errorMessages => ({ ...errorMessages, lastErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, lastErrorShow: false }));
        }

        if( inputs.email === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, emailErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, emailErrorShow: false }));
        }

        if( inputs.username === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, usernameErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, usernameErrorShow: false }));
        }

        if( inputs.contact === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, contactErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, contactErrorShow: false }));
        }

        if( inputs.password === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, password: 'Please provide a password' }));
            setErrorMessages(errorMessages => ({ ...errorMessages, passwordErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, passwordErrorShow: false }));
        }

        if( inputs.passwordCon === '' ) {
            setErrorMessages(errorMessages => ({ ...errorMessages, passwordCon: 'Please confirm your password' }));
            setErrorMessages(errorMessages => ({ ...errorMessages, passwordConErrorShow: true }));
        } else {
            setErrorMessages(errorMessages => ({ ...errorMessages, passwordConErrorShow: false }));
        }

        let result = Object.values(inputs).some(item => item === '');

        if(result) {
            console.log('There is an error')
        } else {
            axios.post( 'http://localhost/ServerSide/addUSer.php', inputs )
            .then( ( res ) => {
                console.log(res);
                if( res.status === 200 ) {
                    navigate('/login');
                }
            } );
        }
    }

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.leftContainer }>

            </div>
            <div className={ styles.rightContainer }>
                <h1 className={ styles.heading }>Sign Up to DataStealer</h1>
                <div className={ styles.namesContainer }>
                    <Input
                        label='First Name'
                        name='first'
                        type='text'
                        placeholder='Enter your first name'
                        className={ styles.nameInput }
                        showError={ errorMessages.firstErrorShow }
                        error={ errorMessages.first }
                        onChange={ firstVal }
                    />
                    <Input
                        label='Last Name'
                        name='last'
                        type='text'
                        placeholder='Enter your last name'
                        className={ styles.nameInput }
                        showError={ errorMessages.lastErrorShow }
                        error={ errorMessages.last }
                        onBlur={ lastVal }
                    />
                </div>
                    <Input
                        label='Email'
                        name='email'
                        type='text'
                        placeholder='Enter your email'
                        iconName={ errorMessages.emailAvailIcon }
                        showIcon={ errorMessages.emailAvailIconShow }
                        showError={ errorMessages.emailErrorShow }
                        error={ errorMessages.email }
                        onChange={ emailVal }
                        onBlur={ validateEmail}
                    />

                    <Input
                        label='Username'
                        name='username'
                        type='text'
                        placeholder='Enter your username'
                        iconName={ errorMessages.usernameAvailIcon }
                        showIcon={ errorMessages. usernameAvailIconShow}
                        showError={ errorMessages.usernameErrorShow }
                        error={ errorMessages.username }
                        onChange={ usernameVal }
                        onBlur={ validateUser }
                    />

                    <Input
                        label='Contact Number'
                        name='contact'
                        type='text'
                        placeholder='Enter your contact number'
                        showError={ errorMessages.contactErrorShow }
                        error={ errorMessages.contact }
                        onChange={contactVal}
                    />

                    <div className={ styles.passwordContainer }>
                        <div className={ styles.passwordContainerLeft }>
                            <Input
                                label='Password'
                                name='password'
                                type='text'
                                placeholder='Enter your password'
                                className={ styles.passInput }
                                showError={ errorMessages.passwordErrorShow }
                                error={ errorMessages.password }
                                onChange={ passwordVal }
                            />

                            <LabelIcon
                                showIcon={ passMatch.lowercase }
                                label='Password includes a Lowercase Letter'
                            />

                            <LabelIcon
                                showIcon={ passMatch.uppercase }
                                label='Password includes a Uppercase Letter'
                            />

                            <LabelIcon
                                showIcon={ passMatch.digit }
                                label='Password includes one Digit'
                            />

                            <LabelIcon
                                showIcon={ passMatch.special }
                                label='Password includes one Special Character'
                            />

                            <LabelIcon
                                showIcon={ passMatch.length }
                                label='Password is at least 5 Characters Long'
                            />

                        </div>

                        <Input
                            label='Confirm Password'
                            name='passwordCon'
                            type='text'
                            placeholder='Confirm your password'
                            className={ styles.passConInput }
                            showError={ errorMessages.passwordConErrorShow }
                            error={ errorMessages.passwordCon }
                            onChange={ passwordConVal }
                        />
                    </div>

                    <Button
                        label='Register'
                        className={ styles.regButton }
                        onClick={ handleSubmit }
                    />

            </div>
        </div>
    );
};

export default Register;