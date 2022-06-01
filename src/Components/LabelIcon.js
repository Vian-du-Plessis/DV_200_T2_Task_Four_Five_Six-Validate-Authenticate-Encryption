import React, { useState, useEffect } from 'react';
import styles from './LabelIcon.module.css';

import Checked from '../Assets/checked.svg'

const LabelIcon = ( props ) => {

    const [ showIcon, setShowIcon ] = useState( false );

    useEffect( () => {
        setShowIcon( props.showIcon );
    } );

    return (
        <div className={ styles.outerContainer }>
            { 
                showIcon &&
                <img 
                    className={ styles.iconImg } 
                    src={ Checked }
                />
            }
            <p>{ props.label }</p>
        </div>
    );
};

export default LabelIcon;