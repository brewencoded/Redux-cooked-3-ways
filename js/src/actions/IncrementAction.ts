import {
  INCREMENT
} from '../constants';

const IncrementAction = (amount) => {
  return {
    type: INCREMENT,
    payload: {
      amount
    }
  };
};

export default IncrementAction;