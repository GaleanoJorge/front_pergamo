import { MainClass } from './main-class';
import { CustomFieldType } from './custom-field-type';

export class CustomField extends MainClass {
    id: number;
    custom_field_type_id: number;
    key: string;
    custom_field_type: CustomFieldType;
}