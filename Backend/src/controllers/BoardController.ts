import {Request, Response} from 'express';

class BoardController {
    create(req: Request, res: Response) {
        const {title} = req.body;
        if (!title) {
            return res.status(400).json({message: 'Title is required'});
        }
        return res.status(201).json({
            message: 'Board created successfully',
             board: {id: 1, title}
        });
    }
}

export default new BoardController();