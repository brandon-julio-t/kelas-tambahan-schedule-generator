<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="border hover:border-black focus:border-black focus:outline-none px-4 py-2 rounded"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppField',
  props: {
    modelValue: [String, Number],
    placeholder: String,
    type: { type: String, required: true },
  },
  emits: ['update:modelValue'],
});
</script>
