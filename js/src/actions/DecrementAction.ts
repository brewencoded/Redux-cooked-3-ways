import {
    DECREMENT
} from '../constants';
  
const DecrementAction = (amount) => {
    return {
        type: DECREMENT,
        payload: {
            amount
        }
    };
};
  
export default DecrementAction;