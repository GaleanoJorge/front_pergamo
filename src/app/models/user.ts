import { Status } from './status';
import { Gender } from './gender';
import { AcademicLevel } from './academic_level';
import { IdentificationType } from './identification-type';
import { Municipality } from './municipality';
import { Role } from './role';
import { Delivery } from './delivery';

export class User {
    id: number;
    status_id: number;
    gender_id: number;
    academic_level_id: number;
    identification_type_id: number;
    birthplace_municipality_id: number;
    username: string;
    email: string;
    firstname: string;
    middlefirstname: string;
    lastname: string;
    middlelastname: string;
    identification: number;
    birthday: Date;
    phone: number;
    status: Status;
    gender: Gender;
    academic_level: AcademicLevel;
    identification_type: IdentificationType;
    municipality: Municipality;
    roles: Role[];
    deliveries?: Delivery[];
    file: string;
}
