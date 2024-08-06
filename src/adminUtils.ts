
import { Request, Response } from 'express';

export function checkAdmin(req: Request, res: Response, next: any) {
    if (req.headers.authorization === 'admin') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
