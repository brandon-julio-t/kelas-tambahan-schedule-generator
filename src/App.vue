<template>
  <main class="container mx-auto px-4">
    <h1 class="mb-8 font-bold text-3xl">Schedule Generator</h1>

    <form action="#" @submit.prevent="handleSubmit()">
      <div class="grid grid-flow-row auto-rows-max gap-8">
        <app-field v-model="assistant" type="text" placeholder="Name + Generation, ex: BR20-2"></app-field>
        <app-field v-model="subject" type="text" placeholder="Subject, ex: SWP"></app-field>

        <div class="grid grid-cols-2 gap-4">
          <app-field v-model="date" type="date"></app-field>
          <app-field v-model="time" type="time"></app-field>
        </div>
      </div>

      <app-button class="my-8 bg-blue-500 text-white border-0" type="submit"
        ><app-plus class="w-6 inline"></app-plus> Generate</app-button
      >
    </form>

    <div v-if="data.length > 0">
      <h2 class="my-8 font-bold text-3xl">Output</h2>
      <pre class="select-all"><code>{{ output }}</code></pre>

      <div class="grid grid-rows-4 gap-4 my-8">
        <input v-model="removeIdx" class="text-center bg-transparent text-4xl" type="text" tabindex="-1" />

        <div class="grid grid-cols-2 gap-4">
          <app-button @click="handleIncrementRemoveIdx"><app-plus class="w-6 mx-auto"></app-plus></app-button>
          <app-button @click="handleDecrementRemoveIdx"><app-minus class="w-6 mx-auto"></app-minus></app-button>
        </div>

        <app-button @click="handleRemove()" class="text-red-600 border-red-600 hover:text-black focus:text-black"
          ><app-x class="w-6 inline"></app-x> Remove Selected</app-button
        >
        <app-button @click="handleClearAll()" class="text-red-600 border-red-600 hover:text-black focus:text-black"
          ><app-trash class="w-6 inline"></app-trash> Clear All</app-button
        >
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import './assets/tailwind.css';

import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';

import AppButton from './components/AppButton.vue';
import AppField from './components/AppField.vue';

import AppMinus from './icons/AppMinus.vue';
import AppPlus from './icons/AppPlus.vue';
import AppPlusCircle from './icons/AppPlusCircle.vue';
import AppTrash from './icons/AppTrash.vue';
import AppX from './icons/AppX.vue';

export default defineComponent({
  name: 'App',
  components: { AppButton, AppField, AppMinus, AppPlus, AppPlusCircle, AppTrash, AppX },
  setup() {
    const assistant = ref('');
    const date = ref('');
    const removeIdx = ref(0);
    const subject = ref('');
    const time = ref('');

    const data = ref([]);
    const codeBlock = '```';
    const divider = '+=============+========================================================+=======================+';
    const headers = '|   Ast.      |   Materi                                               |   Tanggal/Waktu       |';

    const output = computed(() => {
      const lengthAssistant = assistant.value.length;
      const lengthSubject = subject.value.length;
      const lengthDate = date.value.length;
      const lengthTime = time.value.length;

      const output = [codeBlock, divider, headers, divider];

      data.value.forEach((row, idx) => {
        const symbolFront = idx === removeIdx.value - 1 ? '>' : '|';
        const symbolBack = idx === removeIdx.value - 1 ? '<' : '|';
        const paddedAssistant = `   ${row.assistant}`.padEnd(13);
        const paddedSubject = `   ${row.subject}`.padEnd(56);
        const paddedDateTime = `   ${row.date} ${row.time}`.padEnd(23);
        output.push(`${symbolFront}${paddedAssistant}|${paddedSubject}|${paddedDateTime}${symbolBack}`);
      });

      output.push(...[divider, codeBlock]);

      return output.join('\n');
    });

    onMounted(() => {
      const schedules = JSON.parse(localStorage.getItem('schedules'));
      if (schedules !== null) {
        data.value.splice(0, 0, ...schedules);
      }
    });

    function handleSubmit(): void {
      const fields = [date, assistant, subject, time];
      const areAllFilled = fields.every(field => field.value.length > 0);

      if (!areAllFilled) {
        alert('Please fill all fields.');
      } else if (!assistant.value.match(/[A-Z][A-Z][0-9][0-9]-[0-9]/g)) {
        alert('Name + Generation is wrong. Minta di-eval?');
      } else {
        data.value.splice(0, 0, {
          assistant: assistant.value,
          subject: subject.value,
          date: date.value,
          time: time.value,
        });

        saveData();
        fields.forEach(field => (field.value = ''));
      }
    }

    function handleIncrementRemoveIdx(): void {
      removeIdx.value = Math.min(data.value.length, removeIdx.value + 1);
    }

    function handleDecrementRemoveIdx(): void {
      removeIdx.value = Math.max(0, removeIdx.value - 1);
    }

    function handleRemove(): void {
      if (removeIdx.value < 1) {
        return;
      }

      data.value.splice(removeIdx.value - 1, 1);
      removeIdx.value = 0;
      saveData();
    }

    function handleClearAll(): void {
      data.value.splice(0, data.value.length);
      saveData();
    }

    function saveData(): void {
      localStorage.setItem('schedules', JSON.stringify(data.value));
    }

    return {
      assistant,
      data,
      date,
      handleClearAll,
      handleDecrementRemoveIdx,
      handleIncrementRemoveIdx,
      handleRemove,
      handleSubmit,
      output,
      removeIdx,
      subject,
      time,
    };
  },
});
</script>
