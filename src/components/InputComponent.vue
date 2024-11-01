<script setup lang="ts">
import { reactive } from 'vue';
import { useTaskStore } from './stores/task';
import { useThemeStore } from './stores/theme';
import { ThemeState } from "models/ThemeState";

// Iconos
import { XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon as SolidCircleIcon } from '@heroicons/vue/24/solid';

const themeStore = useThemeStore();
const theme = reactive(themeStore);

const taskStore = useTaskStore();
let newTask = '';
const reactiveTask = reactive({
  id: Date.now(),
  tarea: '',
  completada: false
});
function makeItComplete() {
  reactiveTask.completada = !reactiveTask.completada;
}

function saveTask() {
  taskStore.addTask(reactiveTask);
  reactiveTask.id = Date.now();
  reactiveTask.tarea = '';
  reactiveTask.completada = false;
}

function addTask() {
  if (newTask) {
    taskStore.addTask({ id: Date.now(), tarea: newTask, completada: false });
    newTask = '';
  }
}
</script>

<template>
  <div :class="['wrapper relative group border-black', theme.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black']">

    <div class="absolute top-3 sm:top-4 left-5">
      <div class="relative">
        <input
          type="checkbox"
          class="form-checkbox border rounded-full focus:outline-none h-6 w-6 cursor-pointer transition ease-linear"
          :checked="reactiveTask.completada"
          @click="makeItComplete"
        />
        <SolidCircleIcon v-if="reactiveTask.completada" class="h-6 w-6 absolute left-0 top-0 text-green-500"/>
      </div>
    </div>

    <form @submit.prevent="addTask">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        type="text"
        placeholder="Escribe una nueva tarea"
        :class="['sm:text-base overflow-ellipsis w-full focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear', theme.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black']"
      />

      <div class="btns absolute right-0 top-0 py-2 sm:py-2.5 px-2 w-20 h-14 flex justify-around cursor-default transition ease-linear">
        <button @click="saveTask" type="button" class="p-1 cursor-pointer">
          <PlusCircleIcon class="w-6 h-6 hover:text-green-600"/>
        </button>
        <button type="button" class="p-1 cursor-pointer">
          <XMarkIcon class="w-6 h-6 hover:text-red-500"/>
        </button>
      </div>
    </form>
  </div>
</template>


<style scoped>
  input[type="text"] {
    border-radius: 5px;
  }
  .btns {
    background: rgb(190, 190, 190);
    border-radius: 0 5px 5px 0;
  }

  .btns  button:nth-child(1) {
    border-right: 1px solid #434343;
  }

  input.dark {
    background: #434343;
  }

  .btns.dark {
    background: rgb(101, 101, 101);
  }
</style>