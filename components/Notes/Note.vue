<template>
  <div class="card w-96 bg-neutral text-neutral-content">
    <div v-if="edit === false" class="card-body">
      <h1 class="card-title">
        {{ noteTitle }}
      </h1>
      <h3>
        {{ noteTag }}
      </h3>
      <p>
        {{ noteBody }}
      </p>
      <div class="card-actions justify-end">
        <button 
          class="btn btn-primary " 
          @click="edit = true"
        >
          Edit
        </button>
        <button 
          class="btn btn-primary"
          @click="$emit('deleteNote', id)"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-if="edit === true" class="card-body">
      <input 
        v-model="noteTitle" 
        class="mt-2 px-2 py-1 bg-slate-800 border shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
      />
      <input 
        v-model="noteTag" 
        class="mt-2 px-2 py-1 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
      />
      <textarea 
        v-model="noteBody" 
        class="mt-3 px-2 py-1 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
      />
      <div class="card-actions justify-end">
        <button 
          class="btn btn-primary"
          @click="edit = false"
        >
          Cancel
        </button>
        <button 
          class="btn btn-primary"
          @click="submitEdit"
        >
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
