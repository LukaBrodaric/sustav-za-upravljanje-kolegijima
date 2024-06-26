<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';

const session = ref();

onMounted(async () => {
  try {
    const { data } = await supabase.auth.getSession();
    session.value = data.session;

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session;
    });
  } catch (error) {
    console.error(error);
  }
});

const professors = ref([])

async function getProfessors() {
  try {
    const res = await fetch('http://localhost:8000/professors/')
    const { data } = await res.json()
    professors.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
	getProfessors()
})

const professorName = ref('')
const professorSurname = ref('')
let isLoading = ref(false)

async function addProfessor() {
	isLoading.value = true

	const professor = {
		name: professorName.value,
		surname: professorSurname.value
	}
  try {
    const res = await fetch('http://localhost:8000/professors/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(professor)
    })
    const { data } = await res.json()

    getProfessors()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>




<template>

</template>