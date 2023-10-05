export interface AssociativeArray<T> {
    [key: string] : T
}

export interface LoginResponse{
    error: string,
    token: string,
    username: string
}

export interface RegisterResponse{
    errors: string[],
    registered: boolean,
}

