export interface IRequestADemo {
    statusCode: number
    statusMessage: string
    data: Data
}

export interface Data {
    title: string
    message: string
}


export interface IApiResponse<T> {
    statusCode: number
    statusMessage: string
    data: T
}
