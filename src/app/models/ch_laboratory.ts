import { ChMedicalOrders } from './ch-medical-orders';
import { LaboratoryStatus } from './laboratory_status';

export class ChLaboratory {
    id: number;
    medical_order: ChMedicalOrders;
    laboratory_status: LaboratoryStatus;
    file: string;
}
