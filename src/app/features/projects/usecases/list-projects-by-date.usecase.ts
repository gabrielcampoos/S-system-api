import { Result, ResultDto } from "../../../shared/utils";
import { ProjectRepository } from "../repository";

export class ListAllProjectsByDateUsecase {
  async execute(startDate: string, endDate: string): Promise<ResultDto> {
    // Verifica se as datas foram fornecidas
    if (!startDate || !endDate) {
      return Result.error(400, "Both start and end dates must be provided.");
    }

    try {
      const projectRepository = new ProjectRepository();
      const projectsDB = await projectRepository.listProjectsByDateRange(
        startDate,
        endDate
      );

      if (projectsDB.length === 0) {
        return Result.success(
          200,
          "No projects found within the specified date range.",
          []
        );
      }

      // Mapeia os projetos para o formato JSON
      const projects = projectsDB.map((project) => project.toJson());

      return Result.success(
        200,
        "Projects found within the specified date range.",
        projects
      );
    } catch (error) {
      return Result.error(
        500,
        "An error occurred while retrieving the projects."
      );
    }
  }
}
