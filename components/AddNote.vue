<!-- <template>

  <button 
    class=" m-3 py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
    @click="showModal"
  >
    Toggle modal
  </button>


  <div 
    id="staticModal" 
    tabindex="-1" 
    hidden="true" 
    class="fixed top-50 left-50 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div>
      
      
    </div>
  </div>
</template> -->

<template>
  <div>
    <button 
      class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none ease-linear transition-all duration-150" 
      type="button" 
      @click="toggleModal()"
    >
      Add Note
    </button>
    <div 
      v-if="showModal" 
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-slate-800 outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Add Note
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
            </button>
          </div>
          <!--body-->
          <div class="relative p-3 flex-auto">
            <label>Title</label>
            <input  
              v-model="form.title"
              class="mt-1 px-3 py-2 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            />
            <label>Tag</label>
            <input 
              v-model="form.tag" 
              class="mt-1 px-3 py-2 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            />
            <label>Body</label>
            <textarea 
              v-model="form.body" 
              class="mt-1 px-3 py-2 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button 
              class="text-white bg-transparent border border-solid border-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600 font-bold text-sm px-3 py-2 rounded-md outline-none focus:outline-none ease-linear transition-all duration-150" 
              type="button" 
              @click="toggleModal()"
            >
              Close
            </button>
            <button
              class="ml-2 py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
              @click="toggleModal(); $emit('addNote', this.form.title, this.form.tag, this.form.body); clearForm();"
            >
              Add a note
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default{
  name: "large-modal",
  emits: ['addNote'],
  data() {
    return {
      showModal: false,
      form : {
        title: '',
        tag: '',
        body: ''
      },
    }
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal;
    },
    clearForm() {
      this.form.title='' 
      this.form.tag='' 
      this.form.body='' 
    },
    submit() {
      
      this.$emit('addNote')
    }
  }
}
</script>