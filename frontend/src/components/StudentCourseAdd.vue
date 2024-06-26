<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const selectedStudentId = ref('');
const students = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/students/');
    const { data } = await res.json();
    students.value = data;
  } catch (error) {
    console.error(error);
  }
});

function addStudent() {
  fetch('http://localhost:8000/students-courses/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      course_id: route.params.course_id,
      student_id: selectedStudentId.value
    })
  })
}
</script>


<template>
<div>
		<h3 class="text-xl font-bold py-4">
			Studenti
		</h3>
		<form @submit.prevent="addStudent">
      <div class="flex flex-col gap-4 py-4">
        <select class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="selectedStudentId">
          <option selected disabled value="">Odaberi studenta</option>
          <option v-for="student in allStudents" :key="student.id" :value="student.id">{{ student.name }} {{ student.surname }}</option>
        </select>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :disabled="isLoading">Dodaj studenta</button>
      </div>
    </form>

		<table class="table-auto border-collapse w-full border-slate-800 border">
			<thead class="text-left bg-blue-300">
				<tr>
					<th class="p-2 font-medium">Ime</th>
					<th class="p-2 font-medium">Prezime</th>
          <th class="p-2 font-medium">Odaberi</th>
				</tr>
			</thead>
			<tbody class="bg-blue-100 -z-10">
				<tr v-for="student in students" :key="student.id">
					<td class="p-2">{{ student.name }}</td>
					<td class="p-2">{{ student.surname }}</td>
          <td class="p-2">
            <button @click="removeStudentFromCourse(student.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Ukloni</button>
          </td>
				</tr>
				<tr v-if="students.length === 0" class="text-center">
					<td class="p-2" colspan="2">Student nije pronađen</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>