import {User} from "firebase";
import {action, payload, union} from "ts-action";

export const Login = action('currentAccount/Login', payload<User>());
export const Logout = action('currentAccount/Logout');

const CurrentAccountActions = union({
    Login,
    Logout
});
export type CurrentAccountAction = typeof CurrentAccountActions;


export interface CurrentAccountState {
    user?: User
}

const INITIAL_STATE: CurrentAccountState = {
    user: undefined
};

export function reducer(state: CurrentAccountState = INITIAL_STATE, action: CurrentAccountAction) {
    switch(action.type) {
        case Login.type:
            return {
                ...state,
                user: action.payload
            };
        case Logout.type:
            return {
                ...state,
                user: undefined
            };
        default:
            return state;
    }
}