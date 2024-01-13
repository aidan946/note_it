<template>
  <div>
    <div class="w-3/4 h-3/4 ml-auto mr-auto mb-4">
      <select class="select select-bordered w-full max-w-xs">
        <option
          disabled
          selected
        >
          Pick your favorite language
        </option>
        <option>Java</option>
        <option>Go</option>
        <option>C</option>
      </select>
    </div>
    <div class="border-2 rounded-lg w-3/4 h-3/4 ml-auto mr-auto">
      <KanbanBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'kanban'
})
</script>
