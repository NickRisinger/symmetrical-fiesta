import { SphereType } from "../constants/sphere";

export interface Plan {
    id: string;
    type: SphereType;
    createdAt: Date;
    data: any;
}
