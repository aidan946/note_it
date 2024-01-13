<template>
  <div>
    <div class="flex h-[85vh] w-full overflow-x-auto space-x-8">
      <div class="gap-2 p-4 h-300px max-h-[85vh] bg-gray-500/5 rounded ">
        <div class="flex bg-gray-500/0 mb-2 justify-center">
          <h4 class="text-lg font-bold">
            To Do
          </h4>
        </div>
        <VueDraggable
          v-model="databaseNotes"
          class="overflow-y-auto h-full"
          animation="150"
          ghost-class="ghost"
          group="people"
          @update="onUpdate"
          @add="onAdd(databaseNotes)"
          @remove="remove"
        >
          <div
            v-for="note in databaseNotes"
            :key="note.id"
            class="cursor-move h-30 bg-gray-500/5 rounded p-3"
          >
            <NotesNote
              :id="note.id"
              class="min-w-full"
              :title="note.title"
              :body="note.body"
            />
          </div>
        </VueDraggable>
      </div>
      <div class="gap-2 p-4 h-300px bg-gray-500/5 rounded">
        <div class="flex bg-gray-500/0 mb-2 justify-center">
          <h4 class="text-lg font-bold">
            In Progress
          </h4>
        </div>
        <VueDraggable
          v-model="list2"
          class="overflow-y-auto h-full"
          animation="150"
          group="people"
          ghost-class="ghost"
          @update="onUpdate"
          @add="onAdd(list2)"
          @remove="remove"
        >
          <div
            v-for="note in list2"
            :key="note.id"
            class="cursor-move h-30 bg-gray-500/5 rounded p-3 min-w-full"
          >
            <NotesNote
              :id="note.id"
              class="min-w-full"
              :title="note.title"
              :body="note.body"
            />
          </div>
        </VueDraggable>
      </div>
      <div class="gap-2 p-4 h-300px bg-gray-500/5 rounded">
        <div class="flex bg-gray-500/0 mb-2 justify-center">
          <h4 class="text-lg font-bold">
            Done
          </h4>
        </div>
        <VueDraggable
          v-model="list3"
          class="overflow-y-auto h-full"
          animation="150"
          group="people"
          ghost-class="ghost"
          @update="onUpdate"
          @add="onAdd(list3)"
          @remove="remove"
        >
          <div
            v-for="note in list3"
            :key="note.id"
            class="cursor-move h-30 bg-gray-500/5 rounded p-3"
          >
            <NotesNote
              :id="note.id"
              class="min-w-full"
              :title="note.title"
              :body="note.body"
            />
          </div>
        </VueDraggable>
      </div>
    </div>
    <div class="flex justify-between">
      <preview-list :list="databaseNotes" />
      <preview-list :list="list2" />
      <preview-list :list="list3" />
    </div>
  </div>
</template>

<script setup lang="js">
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

const list2 = ref([])
const list3 = ref([])

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
