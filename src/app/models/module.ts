import {Session} from './session';

export class Module {
  id: number;
  course_id: number;
  name: string;
  description: string;
  sessions: Session[];
  colspan: number;
  checked?: boolean;
  module?: {
    name: string;
  };
}
