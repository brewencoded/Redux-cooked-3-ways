import IUserModel from "./IUserModel";

export type UserConstructor = (options?) => IUserModel;

export interface IUserProps {
    text: string;
    id: string | null
    done: boolean;
}

export interface IUser {
    construct: UserConstructor;
    props: IUserProps;
    proto: {}
}

const User: IUser = {
    construct(options): IUserModel {
        const instance: IUserModel = Object.create(this.proto);
        const props: IUserProps = Object.assign({}, this.props, options);
        Object.keys(props).forEach((prop) => instance[prop] = props[prop]);
        return instance;
    },
    props: {
        text: '',
        id: null,
        done: false
    },
    proto: {}
};

export default User;