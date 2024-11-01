import { defineStore } from 'pinia';
import { Task, TaskState } from './models/TaskState';

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    loading: false,
    data: [],
  }),
  actions: {
    addTask(task: Task) {
      this.data.push(task);
    },
    removeTask(task: Task) {
      this.data = this.data.filter((t) => t.id !== task.id);
    },
    updateTaskStatus(task: Task) {
      const index = this.data.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.data[index].status = !this.data[index].status;
      }
    },
    showCompleted() {
      this.data = this.data.filter((task) => task.status);
    },
    showPending() {
      this.data = this.data.filter((task) => !task.status);
    },
    showAll(originalData: Task[]) {
      this.data = [...originalData];
    },
  },
});
