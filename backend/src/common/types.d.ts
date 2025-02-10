export type InputType = {
    email: string;
    password: string;
}

export type RegisterType = InputType & {
    name: string;
    surname: string;
}