<template>
  <div class="w-full justify-center mt-5 pr-16 absolute
        inset-0
        flex
        justify-center">
    <div class="">
      <h1 class="flex justify-center text-2xl">
        Add a new Note
      </h1>
      <NotesHomeNewNote class="mt-4" />
    </div>
    <div class="mt-10">
      <div>
        <h1 class="flex justify-center text-2xl">
          Commonly Veiwed Notes
        </h1>
      </div>
      <div class="flex flex-wrap justify-center">
        <div 
          v-for="note in databaseNotes"
          :key="note.id"
          class="m-4"
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
    </div>
  </div>
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
        const { data } = await supabase.from('notes').select('id, title, body').eq('user_id', user.id).limit(4)
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
    async deleteNote(id) {
      const supabase = useSupabaseClient()
      await supabase
        .from('notes')
        .delete()
        .eq('id', id)
      let newDatabaseNotes = this.databaseNotes.filter(i => i.id != id)
      this.databaseNotes = newDatabaseNotes
    }
  }
}
</script>
