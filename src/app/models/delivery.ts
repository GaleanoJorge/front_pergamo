import { GroupActivity } from './group_activity';
import { MainClass } from './main-class';
import { Score } from './score';
import { Activity } from './activity';

export class Delivery extends MainClass {
    id: number;
    activity_id: number;
    user_id: number;
    user_group_activity_id: number;
    file_name: string;
    file_path: string;
    groupActivities: GroupActivity[];
    scores: Score[];
    activity: Activity;
}
