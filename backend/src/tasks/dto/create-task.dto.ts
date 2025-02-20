export class CreateTaskDto {
  title: string;
  status: string;
  projectId: string; // ID du projet auquel la tâche appartient
}
