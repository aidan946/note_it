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
      const { data } = await supabase.from('notes').select('id, title, body').eq('user_id', user.id)
      if (data) {
        this.databaseNotes = data
      } else {
        this.databaseNotes = {}
      }
      
    })
  },
  methods: {
    async addNote(newNoteTitle, newNoteBody) {
      const supabase = useSupabaseClient()  
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
      .from('notes')
      .insert([
        { title: newNoteTitle, body: newNoteBody, user_id: user.id },
      ])
      .select('id, title, body')
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
