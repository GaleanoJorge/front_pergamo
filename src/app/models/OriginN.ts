import {Validity} from './validity';
import {User} from './user';
import { MainClass } from './main-class';

export class OriginN extends MainClass {
    id: number;
    name: string;
    validity_id: number;
    user_id: number;
    description: string;
    Validity: Validity;
    User: User;
}
