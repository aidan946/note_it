<template>
  <div
    class="w-full mt-2 pr-56
        inset-0
  "
  >
    <div class="mt-8">
      <h1 class="flex justify-center text-2xl ">
        Add a new Note
      </h1>
      <NotesHomeNewNote class="mt-4 max-w-xl mx-auto" />
    </div>
    <div class="mt-16">
      <div>
        <h1 class="flex justify-center text-2xl">
          Commonly Veiwed Notes
        </h1>
      </div>
      <div class="flex flex-wrap justify-center">
        <div
          v-for="note in databaseNotes"
          :key="note.id"
          class="m-2"
        >
          <NotesNote
            :id="note.id"
            class=""
            :title="note.title"
            :body="note.body"
            @delete-note="deleteNote"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  layout: 'notes'
})

let { data: databaseNotes } = await useAsyncData('databaseNotes', async () => {
  if (user.value) {
    const { data } = await client.from('notes').select('id, title, body').eq('user_id', user.value.id).limit(4)
    return data
  }
})

async function addNote(newNoteTitle: string, newNoteTag: string, newNoteBody: string) {
  if (user.value && databaseNotes.value) {
    const { data } = await client
      .from('notes')
      .insert([
        { title: newNoteTitle, tag: newNoteTag, body: newNoteBody, user_id: user.value.id },
      ])
      .select('id, title, tag, body')
    if (data) {
      databaseNotes.value.push(data[0])
    }
  }
}

async function deleteNote(id: number) {
  if (databaseNotes.value) {
    await client
      .from('notes')
      .delete()
      .eq('id', id)
    let newDatabaseNotes = databaseNotes.value.filter((i: { id: number; title: string; body: string }) => i.id != id)
    databaseNotes.value = newDatabaseNotes
  }
}
async function filterNotes(id: number) {

}
</script>
