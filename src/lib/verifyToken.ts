
import {jwtDecode} from 'jwt-decode';

import { CustomJwtPayload } from '@/types';

export const verifyToken = (token:string):CustomJwtPayload=>{
    return jwtDecode(token)
}