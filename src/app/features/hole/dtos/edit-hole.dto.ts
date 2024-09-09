export interface EditHoleDto {
  id: string;
  newData: {
    holeNumber?: string;
    initialDate?: Date;
    finalDate?: Date;
    name?: string;
    workDescription?: string;
    quota?: string;
    waterLevel?: string;
    interval?: string;
    waterLevelTwo?: string;
    intervalTwo?: string;
    torque?: string;
    coating?: string;
    ultimateDigger?: string;
    initialHelical?: string;
    finalHelical?: string;
    printSpt?: string;
    stop?: string;
    textPoll?: string;
    prober?: string;
    pageLines?: string;
  };
}
