<template>
  <div>
    <HeaderBar />
    <div class="w-screen mt-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Plan-It',
  meta: [
    { name: 'description', content: 'Plan your notes!.' }
  ],
})
useSeoMeta({
  ogImage: '/note-logo.png'
})
</script>

