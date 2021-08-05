import { MainClass } from './main-class';

export class AssistanceSession extends MainClass {
    id: number;
    session_id: number;
    user_role_group_id: number;
    start_time: string;
    closing_time: string;
    start_time_night: string;
    closing_time_night: string;
}
