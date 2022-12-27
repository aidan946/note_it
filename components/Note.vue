<template>
  <div class="note">
    <h1>{{ title }}</h1>
    <h3>{{ tag }}</h3>
    <p>
      {{ body }}
    </p>
    <div class="centre-buttons">
      <button @click="editNote">
        Edit
      </button>
      <button @click="$emit('deleteNote', this.id)">
        Delete
      </button>
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
  methods: {
    submit() {
      this.$emit('deleteNote') 
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
  }
  
</style>
