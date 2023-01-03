<template>
  <div style="display: inline;">
    <AddNote 
      @add-note="addNote"
    />
    <div 
      v-for="note in databaseNotes" 
      :key="note.id"
    >
      <Note
        :id="note.id"
        class="mt-2"
        :title="note.title"
        :tag="note.tag"
        :body="note.body"
        @delete-note="deleteNote"
      />
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
      const { data } = await supabase.from('notes').select('id, title, tag, body').eq('user_id', user.id)
      if (data) {
        this.databaseNotes = data
      } else {
        this.databaseNotes = {}
      }
      
    })
  },
  methods: {
    async addNote(newNoteTitle, newNoteTag, newNoteBody) {
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
