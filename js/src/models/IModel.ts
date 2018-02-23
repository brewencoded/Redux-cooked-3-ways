export type IConstructor<T> = () => T;

export interface IModel<T, U> {
    construct: IConstructor<U>;
    props: T;
    proto: any
}