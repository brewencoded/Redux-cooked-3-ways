import  {
    CONCAT
} from '../constants';

const ConcatAction = (str) => {
    return {
        type: CONCAT,
        payload: {
            str
        }
    }
};

export default ConcatAction;