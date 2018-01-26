import * as React from 'react';
import Button from './Button';

import {
    CONCAT
} from '../constants';
import {
    ConcatAction
} from '../actions';

const Concatter = (props) => {
    let inputVal = '';
    const concat = () => {
        props.dispatch(ConcatAction(inputVal));
        (document.getElementById('thingy') as HTMLInputElement).value = '';
    };
    const handleChange = (event) => {
        inputVal = event.target.value;
    };

    return (
        <div>
            <input id="thingy" type="text" onChange={handleChange}/>
            <Button onClick={concat}>Concat</Button>
            <p>{props.store.str}</p>
        </div>
    );
};

export default Concatter;
