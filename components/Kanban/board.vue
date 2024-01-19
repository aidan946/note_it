<template>
  <div>
    <div class="flex flex-nowrap h-[85vh] w-full overflow-x-auto overflow-y-hidden space-x-8">
      <div class="flex-shrink-0 basis-96 gap-2 p-4 h-300px h-full bg-gray-500/5 rounded">
        <div class="flex bg-gray-500/0 mb-2 justify-center">
          <h4 class="text-lg font-bold">
            To Do
          </h4>
        </div>
        <VueDraggable v-model="todo" class="overflow-y-auto h-full" animation="150" ghost-class="ghost" group="people"
          @update="onUpdate" @add="onAdd(todo)" @remove="remove">
          <div v-for="note in todo" :key="note.id" class="cursor-move h-30 bg-gray-500/5 rounded p-3">
            <NotesNote :id="note.id" class="min-w-full" :title="note.title" :body="note.body" />
          </div>
        </VueDraggable>
      </div>
      <div class="flex-shrink-0 basis-96 gap-2 w-200px p-4 h-300px bg-gray-500/5 rounded">
        <div class="flex bg-gray-500/0 mb-2 justify-center">
          <h4 class="text-lg font-bold">
            In Progress
          </h4>
        </div>
        <VueDraggable v-model="in_progress" class="overflow-y-auto h-full" animation="150" group="people"
          ghost-class="ghost" @update="onUpdate" @add="onAdd(in_progress)" @remove="remove">
          <div class="cursor-move h-30 bg-gray-500/5 rounded p-3 min-w-full" v-for="note in in_progress" :key="note.id">
            <NotesNote class="min-w-full" :id="note.id" :title="note.title" :body="note.body" />
          </div>
        </VueDraggable>
      </div>
      <div class="flex-shrink-0 basis-96 gap-2 p-4 h-300px bg-gray-500/5 rounded">
        <div class="flex bg-gray-500/0 mb-2 justify-center">
          <h4 class="text-lg font-bold">
            Done
          </h4>
        </div>
        <VueDraggable v-model="done" class="overflow-y-auto h-full" animation="150" group="people" ghost-class="ghost"
          @update="onUpdate" @add="onAdd(done)" @remove="remove">
          <div class="cursor-move h-30 bg-gray-500/5 rounded p-3" v-for="note in done" :key="note.id">
            <NotesNote class="min-w-full" :id="note.id" :title="note.title" :body="note.body" />
          </div>
        </VueDraggable>
      </div>
    </div>
    <div class="flex justify-between">
      <preview-list :list="todo" />
      <preview-list :list="in_progress" />
      <preview-list :list="done" />
    </div>
  </div>
</template>

<script setup lang="js">
import { VueDraggable } from 'vue-draggable-plus'
const client = useSupabaseClient()
const user = useSupabaseUser()


let { data: todo } = await useAsyncData('databaseNotes', async () => {
  if (user.value) {
    const { data } = await client.from('notes').select('id, title, body').eq('user_id', user.value.id)
    if (data) {
      return data
    }
  }
})

const in_progress = ref([])
const done = ref([])

function onUpdate() {
  console.log('update')
}
function onAdd(modal) {
  console.log('add')
  console.log(Object.keys({ modal })[0])
}
function remove() {
  console.log('remove')
}
</script>
