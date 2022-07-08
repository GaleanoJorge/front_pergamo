import { MainClass } from './main-class';
import { CriterionActivityGoal } from './criterion_activity_goal';

export class Score extends MainClass {
    id: number;
    delivery_id: number;
    user_role_course_id: number;
    score: number;
    observation: string;
    criterion_activity_goal_id: number;
    criterion_activity_goal: CriterionActivityGoal;
}
