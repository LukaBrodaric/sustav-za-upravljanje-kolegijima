<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import StudentsDashboard from './StudentsDashboard.vue';

const files = ref([])
const course = ref({})
const courseId = ref(null)
const route = useRoute()

async function getFiles() {
    try {
        const res = await fetch(`http://localhost:8000/files/?course_id=${route.params.id}`);
        const data = await res.json()
        files.value = data
    } catch (error) {
        console.error(error)
    }
}

async function getCourse() {
    try {
        const res = await fetch(`http://localhost:8000/courses/${route.params.id}`)
        const { data } = await res.json()
        course.value = data[0]
        courseId.value = data[0].id
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    getCourse();
    getFiles();
});

</script>

<template>
    <div>
    <h3 class="text-xl font-bold py-4">Dodaj studenta na kolegij</h3>

    <form @submit.prevent="addStudent">
      <div class="flex flex-col gap-4 py-4">
        <select class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="selectedStudentId">
          <option selected disabled value="" >Odaberi studenta</option>
          <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}</option>
        </select>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Dodaj studenta</button>
      </div>
    </form>
  </div>
</template>