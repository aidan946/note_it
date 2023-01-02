<template>
  <div class="note">
    <div v-if="edit === false">
      <h1>{{ noteTitle }}</h1>
      <h3>{{ noteTag }}</h3>
      <p>
        {{ noteBody }}
      </p>
      <div class="centre-buttons">
        <button @click="edit = true">
          Edit
        </button>
        <button @click="$emit('deleteNote', id)">
          Delete
        </button>
      </div>
    </div>
    <div v-if="edit === true">
      <input v-model="noteTitle" />
      <input v-model="noteTag" />
      <textarea v-model="noteBody" />
      <div>
        <button @click="edit = false">
          Cancel
        </button>
        <button @click="submitEdit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "Note",
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    }, 
    tag: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    }
  },
  emits: ['deleteNote'],
  data() {
    return {
      edit:false,
      noteTitle: this.title,
      noteTag: this.tag,
      noteBody: this.body,
    }
  },
  methods: {
    submit() {
      this.$emit('deleteNote') 
    },
    async submitEdit() {
      const supabase = useSupabaseClient()
      await supabase
        .from('notes')
        .update({ title: this.noteTitle, tag: this.noteTag, body: this.noteBody })
        .eq('id', this.id)
      this.edit = false
    }
  }
}
</script>

<style>
  body{
    max-width: 30rem;
  }
  .centre-buttons{
    text-align: center;
  }
  .centre-buttons button{
  margin: 1rem;
  }

  .note{
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 10px;
  }
  
</style>
