import { NextFunction, Request, Response } from "express"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode || 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    })
}

export default errorHandler
