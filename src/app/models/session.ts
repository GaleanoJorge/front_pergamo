import { Activity } from './activity';
import { Group } from './group';

export class Session {
    id: number;
    module_id: number;
    group_id: number;
    name: string;
    description: string;
    teams_key: string;
    teams_url: string;
    organizer_id: string;
    tenant_id: string;
    session_date: Date;
    start_time: Date;
    closing_time: Date;
    activities: Activity[];
    group: Group;
    colspan: number;
}
