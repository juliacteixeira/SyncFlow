export interface Task {
  task_id?: number,
  name_task: string,
  description?: string,
  status?: 'não iniciado' | 'em andamento' | 'parado' | 'concluído',
  project_id?: number,
  data_create?: Date,
  date_conclusion?: Date,

}
