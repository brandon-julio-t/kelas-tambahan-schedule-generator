<template>
  <button
    class="border hover:border-black focus:border-black active:border-white active:text-white active:bg-black focus:outline-none py-2 px-4 rounded"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppButton',
});
</script>
