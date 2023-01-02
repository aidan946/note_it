<template>
  <div style="display: inline;">
    <div>
      <input v-model="form.title" />
      <label>Title</label>
      <input v-model="form.tag" />
      <label>Tag</label>
      <textarea v-model="form.body" />
      <label>Title</label>
      <button @click="addNote">
        Add a note
      </button>
    </div>
    <div 
      v-for="note in databaseNotes" 
      :key="note.id"
    >
      <Note
        :id="note.id"
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
      form : {
        title: '',
        tag: '',
        body: ''
      },
      databaseNotes: {}
    }
  },
  created() {
    const supabase = useSupabaseClient()
   
    useAsyncData('databaseNotes', async () => {
      const { data } = await supabase.from('notes').select('id, title, tag, body')
      this.databaseNotes = data
    })
  },
  methods: {
    async addNote() {
      const supabase = useSupabaseClient()  
      const { data } = await supabase
      .from('notes')
      .insert([
        { title: this.form.title, tag: this.form.tag, body: this.form.body },
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
