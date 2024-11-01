<script setup lang="ts">
import { reactive } from 'vue';
import { useTaskStore } from './stores/task';
import { useThemeStore } from './stores/theme';
import { Task } from "models/Task";

// Iconos
import { TrashIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CompletedIcon } from '@heroicons/vue/24/solid'

const themeStore = useThemeStore();
const theme = reactive(themeStore);

const taskStore = useTaskStore();
const tasks = reactive(taskStore);

function toggleStatus(task: Task) {
  taskStore.updateTaskStatus(task);
}

function removeTask(task: Task) {
  taskStore.removeTask(task);
}

</script>

<template>
    <div :class="['list-wrapper max-w rounded overflow-y-auto shadow-lg mt-10 p-4 transition ease-linear', theme.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black']">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
                Mis Tareas
            </div>
        </div>

        <div v-for="task in tasks.data" :key="task.id" class="wrapper relative group border-black my-2 transition ease-linear">
            <form @submit.prevent>
                <div class="absolute top-3 sm:top-4 left-5">
                    <div class="relative">
                        <input
                            type="checkbox"
                            class="form-checkbox border rounded-full focus:outline-none h-6 w-6 cursor-pointer transition ease-linear"
                            :checked="task.completed"
                            @click="toggleStatus(task)"
                        />
                        <CompletedIcon v-if="task.completed" class="h-6 w-6 absolute left-0 top-0 text-green-600"/>
                    </div>
                </div>
                <input
                    v-model="task.text"
                    type="text"
                    class="tarea sm:text-base overflow-ellipsis w-full disabled:bg-white focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear"
                    :class="theme.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'"
                    disabled
                />

                <div class="btns absolute right-0 top-0 py-2 sm:py-2.5 px-2 w-20 h-14 flex justify-around cursor-default">
                    <button @click="removeTask(task)" class="p-1 cursor-pointer">
                        <TrashIcon class="w-6 h-6 hover:text-red-500"/>
                    </button>
                </div>
                <span v-if="task.completed" class="badge absolute right-10 inline-block bg-green-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">Completo</span>
                <span v-else class="badge absolute right-10 inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">Pendiente</span>
            </form>
        </div>

        <div class="px-6 py-2 mt-5">
            <span @click="taskStore.filterTasks('all')" class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg">Todas</span>
            <span @click="taskStore.filterTasks('completed')" class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg">Completas</span>
            <span @click="taskStore.filterTasks('pending')" class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg">Pendientes</span>
        </div>
    </div>
</template>



<style scoped>
    .list-wrapper {
        background: rgb(190, 190, 190);
    }
    .list-wrapper.dark {
        background: rgb(101, 101, 101);
    }
    input.tarea {
        border-radius: 5px;
    }

    input.tarea.dark {
        background: #434343;
    }

    .badge {
        top: -8px
    }
</style>