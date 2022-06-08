import { ActivityType } from './activity_type';
import { Delivery } from './delivery';

export class Activity {
    id: number;
    session_id: number;
    activity_type_id: number;
    name: string;
    description: string;
    activity_type: ActivityType;
    deliveries: Delivery[];
    colspan: number;
}
