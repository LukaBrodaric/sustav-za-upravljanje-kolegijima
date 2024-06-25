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
        <h1 class="py-4 text-3xl font-bold">{{ course.name }}</h1>
        <p class="pb-4">Professor: <span class="font-medium">{{ course.professors?.name }} {{ course.professors?.surname
                }}</span></p>
        <div class="flex flex-col">
            <div class="flex flex-row justify-between px-3 py-2 bg-blue-300 rounded-t shadow-md">
                <h2 class="text-xl font-medium basis-1/2">Dokumenti</h2>
                <p class="text-center basis-1/4">Napravljeno:</p>
                <p class="basis-1/4 text-end">Link</p>
            </div>
            <div v-for="file in files" :key="file.id" class="border-b rounded-b bg-slate-100">
                <div class="flex flex-row justify-between px-3 py-2">
                    <p class="font-medium truncate basis-1/2">{{ file.name }}.pdf</p>
                    <p class="text-center basis-1/4">{{ new Date(file.created_at).toLocaleDateString() }}</p>
                    <div class="basis-1/4 text-end">
                        <a :href="file.url.signedURL" target="_blank" class="text-blue-500">File</a>
                    </div>
                </div>
            </div>
        </div>
        <Suspense>
            <StudentsDashboard :course_id="courseId" />
        </Suspense>
    </div>
</template>