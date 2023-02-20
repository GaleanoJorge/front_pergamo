import { ChLaboratory } from "./ch_laboratory";
import { LaboratoryStatus } from "./laboratory_status";
import { User } from "./user";

export class UserChLaboratory {
  id: number;
  user: User;
  ch_laboratory: ChLaboratory;
  laboratory_status: LaboratoryStatus;
  observation: string;
}
