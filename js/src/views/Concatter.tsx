import * as React from 'react';
import Button from './Button';

import {
    CONCAT
} from '../constants';
import {
    ConcatAction
} from '../actions';
import {
    IConcatState
} from '../reducers/ConcatReducer';
import {
    IConcatAction
} from '../actions/ConcatAction';

export interface IConcatterProps {
    dispatch: (action: IConcatAction) => void;
    state: IConcatState;
}

const Concatter: React.SFC<IConcatterProps> = (props) => {
    let inputVal: string = '';
    const concat = (): void => {
        props.dispatch(ConcatAction(inputVal));
        (document.getElementById('thingy') as HTMLInputElement).value = '';
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        inputVal = event.target.value;
    };

    return (
        <div>
            <input id="thingy" type="text" onChange={handleChange}/>
            <Button onClick={concat}>Concat</Button>
            <p>{props.state.str}</p>
        </div>
    );
};

export default Concatter;
