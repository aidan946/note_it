<template>
  <div class="h-full divide-y divide-solid">
    <div class="drawer lg:drawer-open">
      <label for="my-drawer-2" class="drawer-overlay">
      </label>
      <ul class="menu p-4 w-48 bg-base-100 text-base-content">
        <li @click="$emit('addNote')">
          <a>Add Note</a>
        </li>
        <li>
          <NuxtLink to="/notes/home">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/notes/my-notes">
            My Notes
          </NuxtLink>
        </li>
      </ul>
      <div class="divider"></div>
      <div class="menu">
        <li class="flex">
          <a>My Tags: <button class="btn btn-ghost btn-circle avatar" @click="$emit('addTag')">+</button></a>
        </li>
        <li v-for="tag in allTags" :key="tag.id" class="flex">
          <a @click="$emit('filterNotes', tag.id)">{{ tag.name }}</a>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

defineEmits(['addNote', 'addTag', 'filterNotes'])

const { data: allTags } = await useAsyncData('tags', async () => {
  if (user.value) {
    const { data } = await client.from('tags').select('id, name').eq('user_id', user.value.id)
    if (data) {
      return data
    }
  }
})
</script>
