import * as jwt from 'jsonwebtoken';
//import * as config from 'config';
import { Request, Response, NextFunction } from 'express';
import {Admins} from '../model/admin.model';

interface AuthRequest extends Request {
  token?: string;
  user_name?: any;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Authorization header missing');
    }
    const decode: any = jwt.verify(token, "secretcode");
    const user_name = await Admins.findOne({_id: decode._id, "tokens.token": token});
    if (!user_name) {
      throw new Error('Please Authenticate');
    }
    req.token = token;
    req.user_name = user_name;
    next();
  } catch (error: any) {
    res.status(401).send({message: error.message});
    console.log(error.message);
  }
}

export default auth;