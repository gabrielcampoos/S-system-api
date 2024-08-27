export interface UpdateProjectDto {
  id: string;
  projectNumber: string;
  client: string;
  projectAlphanumericNumber: string;
  workDescription: string;
  workSite: string;
  releaseDate: Date;
  initialDate: Date;
  finalDate: Date;
  headerText: string;
}
