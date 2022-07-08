import { MainClass } from './main-class';
import { Criterion } from './criterion';
import { Goal } from './goal';

export class CriterionActivityGoal extends MainClass {
    id: number;
    criterion_id: number;
    activity_id: number;
    goal_id: number;
    criterion: Criterion;
    goal: Goal;
}
