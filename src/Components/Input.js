import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';

const Input = ( props ) => {

    const [ showIcon, setShowIcon ] = useState( false );
    const [ showError, setShowError ] = useState( false );

    useEffect( () => {
        setShowIcon( props.showIcon );
        setShowError( props.showError );
    } );

    return (
        <div className={`
            ${ styles.outerContainer } 
            ${ props.className ? props.className : '' }
        `}>
            <label className={ styles.topLabel }>{ props.label }</label>
            <div className={`
                ${ styles.inputContainer }
                ${ props.classNameInputContainer ? props.classNameInputContainer : '' }
            `}>
                <input
                    name={ props.name }
                    type={ props.type }
                    placeholder={ props.placeholder }
                    onBlur={ props.onBlur }
                    onChange={ props.onChange }
                />

                { 
                    showIcon &&
                    <img 
                        className={ styles.iconImg } 
                        src={ require( `../Assets/${ props.iconName }.svg` ) }
                    />
                }

            </div>
            {
                showError &&
                <label className={ styles.errorLabel }>{ props.error }</label>
            }
        </div>
    );
};

export default Input;