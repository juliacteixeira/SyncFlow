export class ApiError extends Error{
    public readonly statusCode: number;

    constructor(message:string, statusCode:number){
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError{
    constructor(message:string){
        super(message, 400);
    }
}

export class NotFoundError extends ApiError{
    constructor(message:string){
        super(message, 402);
    }
}

export class UnauthorizedError extends ApiError{
    constructor(message:string){
        super(message, 401);
    }
}

export class InternalServerError extends ApiError{
    constructor(message:string){
        super(message, 500);
    }
}
export class CampusError extends ApiError{
    constructor(message:string){
        super(message, 404);
    }
}