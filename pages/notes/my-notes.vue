<template>
  <div class="flex flex-wrap justify-center overflow-auto max-h-full">
    <div v-for="note in databaseNotes" :key="note.id" class="m-2">
      <NotesNote :id="note.id" class="mt-2" :title="note.title" :body="note.body" @delete-note="deleteNote" />
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  layout: 'notes',
  middleware: 'auth'
})

let { data: databaseNotes } = await useAsyncData('databaseNotes', async () => {
  if (user.value) {
    const { data } = await client.from('notes').select('id, title, body').eq('user_id', user.value.id)
    if (data) {
      return data
    }
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
</script>
