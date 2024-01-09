<template>
  <div class="flex">
    <VueDraggable class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      v-model="databaseNotes" animation="150" ghostClass="ghost" group="people" @update="onUpdate" @add="onAdd"
      @remove="remove">
      <div v-for="note in databaseNotes" :key="note.id" class="cursor-move h-30 bg-gray-500/5 rounded p-3">
        <NotesNote :id="note.id" class="" :title="note.title" :body="note.body" />
      </div>
    </VueDraggable>
    <VueDraggable class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
      v-model="list2" animation="150" group="people" ghostClass="ghost" @update="onUpdate" @add="onAdd" @remove="remove">
      <div v-for="note in list2" :key="note.id" class="cursor-move h-30 bg-gray-500/5 rounded p-3">
        <NotesNote :id="note.id" class="" :title="note.title" :body="note.body" />

      </div>
    </VueDraggable>
  </div>
  <div class="flex justify-between">
    <preview-list :list="databaseNotes" />
    <preview-list :list="list2" />
  </div>
</template>

<script setup>
import { VueDraggable } from 'vue-draggable-plus'
const client = useSupabaseClient()
const user = useSupabaseUser()


let { data: databaseNotes } = await useAsyncData('databaseNotes', async () => {
  if (user.value) {
    const { data } = await client.from('notes').select('id, title, body').eq('user_id', user.value.id)
    if (data) {
      return data
    }
  }
})

const list1 = ref([
  {
    name: 'Joao',
    id: '1'
  },
  {
    name: 'Jean',
    id: '2'
  },
  {
    name: 'Johanna',
    id: '3'
  },
  {
    name: 'Juan',
    id: '4'
  }
])
const list2 = ref(
  list1.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`
  }))
)
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
</script>
