import IUserModel from "./IUserModel";

export type UserConstructor = (options?) => IUserModel;

export interface IUserProps {
    name: string;
    email: string | null
    loginStatus: boolean;
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
        name: '',
        email: null,
        loginStatus: false
    },
    proto: {}
};

export default User;