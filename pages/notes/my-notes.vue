<template>
  <NuxtLayout name="notes">
    <div class="flex flex-wrap justify-center overflow-auto max-h-full" >
     <div 
        v-for="note in databaseNotes" 
        :key="note.id"
        class="m-2"
      >
        <NotesNote
          :id="note.id"
          class="mt-2"
          :title="note.title"
          :body="note.body"
          @delete-note="deleteNote"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">

export default {

  data() {
    
    return {
      
      databaseNotes: {}
    }
  },
  created() {
    const supabase = useSupabaseClient()
    useAsyncData('databaseNotes', async () => {
      const { data: { user } } = await supabase.auth.getUser()
      this.databaseNotes = {}

      if (user) {
        const { data } = await supabase.from('notes').select('id, title, body').eq('user_id', user.id)
        if (data) {
          this.databaseNotes = data
        }
      }
      
    })
  },
  methods: {
    async addNote(newNoteTitle: string, newNoteTag: string, newNoteBody: string) {
      const supabase = useSupabaseClient()  
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
      .from('notes')
      .insert([
        { title: newNoteTitle, tag: newNoteTag, body: newNoteBody, user_id: user.id },
      ])
      .select('id, title, tag, body')
      this.databaseNotes.push(data[0])
    },
    async deleteNote(id: number) {
      const supabase = useSupabaseClient()
      await supabase
        .from('notes')
        .delete()
        .eq('id', id)
      let newDatabaseNotes = this.databaseNotes.filter((i: { id: number }) => i.id != id)
      this.databaseNotes = newDatabaseNotes
    }
  }
}
</script>
