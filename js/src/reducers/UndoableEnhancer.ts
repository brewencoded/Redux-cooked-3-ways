import { IAction } from "../actions/IAction";

export interface IUndoableState<T> {
    past: T[],
    present: T,
    future: T[]
}

export type UndoableReducer = (state: IUndoableState<any>, action: IAction) => IUndoableState<any>;

const UndoableEnhancer = (reducer: Function): UndoableReducer => {
    const InitialState: IUndoableState<any> = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    };
    return (state: IUndoableState<any> = InitialState, action: IAction): IUndoableState<any> => {
        const { past, present, future } = state
        if (!action) {
            return state;
        }
 
        switch (action.type) {
            case 'UNDO':
                const previous = past[past.length - 1]
                const newPast = past.slice(0, past.length - 1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case 'REDO':
                const next = future[0]
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            default:
                // Delegate handling the action to the passed reducer
                const newPresent = reducer(present, action);
                if (present === newPresent) { // TODO: check for actual equality
                    return state
                }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }
    };
};

export default UndoableEnhancer;
