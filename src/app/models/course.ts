import { Category } from './category';
import { Status } from './status';
import { EducationalInstitution } from './educational-institution';
import { Module } from './module';

export class Course {
  id: number;
  category_id: number;
  educational_institution_id: number;
  status_id: number;
  long_name: string;
  short_name: string;
  start_date: Date;
  finish_date: Date;
  entity_type_id: number;
  custom_fields: string;
  modules: Module[];
  category: Category;
  EducationalInstitution: EducationalInstitution;
  Status: Status;
  curso: string;
  programa: string;
  sede: string;
}
