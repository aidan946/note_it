<template>
  <div>
    <div
      v-if="loadModal"
      class="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-gray-700 bg-opacity-50
      "
    >
      <div class="card-compact rounded-lg w-fit bg-neutral text-neutral-content">
        <div class="card-body">
          <div class="relative">
            <editor-content :editor="titleEditor" />
            <a @click="toggleModal" class="btn btn-sm btn-circle absolute right-0 top-0">✕</a>
          </div>
          <div class="bg-gray-700 rounded p-4">
            <div class="flex text-lg	">
              <template v-for="(item, index) in items">
                <div v-if="item.type === 'divider'" :key="`divider${index}`"> | </div>
                <button
                  class=""
                  :title="item.title"
                >
                  <i :class="`ri-${item.icon} w-24`" />
                </button>
              </template>
            </div>
            
            <editor-content :editor="bodyEditor" />
          </div>
          <div class="flex space-x-2">
            <div v-for="tag in tags">
              <div class="badge badge-primary">{{ tag.name }}</div>
            </div>
          </div>
          <div class="card-actions justify-end mr-0">
            <button 
              class="btn-sm btn-primary rounded-lg" 
              @click="submitEdit"
            >
              <i class="ri-save-fill"></i>
            </button>
            <button 
              class="btn-sm btn-error rounded-lg"
              @click="$emit('deleteNote', id)"
            >
              <i class="ri-delete-bin-7-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-compact rounded-lg w-96 bg-neutral text-neutral-content">
      <div class="card-body">
        <div class="flex">
          <editor-content :editor="titleEditor" />
        </div>
        <editor-content :editor="bodyEditor" />
        <div class="flex space-x-2">
          <div v-for="tag in tags">
            <div class="badge badge-primary">{{ tag.name }}</div>
          </div>
        </div>
        <div class="card-actions justify-end mr-0">
          <button 
            class="btn-sm btn-success rounded-lg" 
            @click="toggleModal"
          >
            <i class="ri-edit-box-fill"></i>
          </button>
          <button 
            class="btn-sm btn-primary rounded-lg" 
            @click="submitEdit"
          >
            <i class="ri-save-fill"></i>
          </button>
          <button 
            class="btn-sm btn-error rounded-lg"
            @click="$emit('deleteNote', id)"
          >
            <i class="ri-delete-bin-7-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import 'remixicon/fonts/remixicon.css'
export default{
  name: "Note",
  components: {
    EditorContent,
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    }, 
    body: {
      type: String,
      default: ''
    }
  },
  emits: ['deleteNote'],
  setup(props) {

    const noteID:number = props.id;
    const noteTitle:string = props.title;
    const noteBody:string = props.body;

    const tags = ref([])

    const titleEditor = useEditor({
      content: noteTitle,
      extensions: [
        Document,
        Heading.configure({
          HTMLAttributes: {
            class: 'card-title text-2xl bold mb-3'
          },
        }),
        Text,
      ],
      editorProps: {
        attributes: {
          class: 'prose focus:outline-none',
        },
      },
    })

    const bodyEditor = useEditor({
      content: noteBody,
      extensions: [
        Document,
        Paragraph.configure({
          HTMLAttributes: {
          },
        }),
        Text,
      ],
      editorProps: {
        attributes: {
          class: 'prose focus:outline-none pb-2',
        },
      },
    })

    onMounted(async () => {
      const supabase = useSupabaseClient()
      const { data } = await supabase.from('tags').select('name').eq('note_id', noteID)
      if (data) {
        tags.value = data  
      }
    });

    return {
      noteTitle,
      noteBody,
      titleEditor,
      bodyEditor,
      tags,
      
    }
  },
  data() {
    const loadModal = false
    return {
      loadModal,
      items: [
        {
          icon: 'bold',
          title: 'Bold',
        },
        {
          icon: 'italic',
          title: 'Italic',
        },
        {
          icon: 'strikethrough',
          title: 'Strike',
        },
        {
          icon: 'code-view',
          title: 'Code',
        },
        {
          icon: 'mark-pen-line',
          title: 'Highlight',
        },
        {
          type: 'divider',
        },
        {
          icon: 'h-1',
          title: 'Heading 1',
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
        },
        {
          icon: 'paragraph',
          title: 'Paragraph',
        },
        {
          icon: 'list-unordered',
          title: 'Bullet List',
        },
        {
          icon: 'list-ordered',
          title: 'Ordered List',
        },
        {
          icon: 'list-check-2',
          title: 'Task List',
        },
        {
          icon: 'code-box-line',
          title: 'Code Block',
        },
        {
          type: 'divider',
        },
        {
          icon: 'double-quotes-l',
          title: 'Blockquote',
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
        },
        {
          type: 'divider',
        },
        {
          icon: 'text-wrap',
          title: 'Hard Break',
        },
        {
          icon: 'format-clear',
          title: 'Clear Format',
        },
        {
          type: 'divider',
        },
        {
          icon: 'arrow-go-back-line',
          title: 'Undo',
          action: () => this.useEditor.chain().focus().undo().run(),
        },
        {
          icon: 'arrow-go-forward-line',
          title: 'Redo',
          action: () => this.useEditor.chain().focus().redo().run(),
        },
      ],
    }
  },
  methods: {
    toggleModal() {
      console.log(this.loadModal)
      if (this.loadModal == true) {
        this.loadModal = false
      } else {
        this.loadModal = true
      }
    },
    submit() {
      this.$emit('deleteNote')
    },
    async submitEdit() {
      const supabase = useSupabaseClient()
      await supabase
        .from('notes')
        .update({ title: this.titleEditor.getHTML(), body: this.bodyEditor.getHTML() })
        .eq('id', this.id)
        // Flash success here
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
</style>
