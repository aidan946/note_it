<!-- eslint-disable vue/no-setup-props-destructure -->
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
        z-10
      "
    >
      <div class="card-compact rounded-lg w-fit bg-neutral text-neutral-content">
        <div class="card-body">
          <div class="relative">
            <editor-content :editor="titleEditor" />
            <a 
              class="btn btn-sm btn-circle absolute right-0 top-0" 
              @click="toggleModal"
            >
              ✕
            </a>
          </div>
          <div class="bg-gray-700 rounded p-4">
            <div class="flex text-lg	h-8">
              <div 
                v-for="(item, index) in items" 
                :key="item.icon"
                class="p-1"
              >
                <div 
                  v-if="item.type === 'divider'" 
                  :key="`divider${index}`"
                > 
                  | 
                </div>
                <button
                  class="menu-item"
                  :class="{ 'is-active': item.isActive ? item.isActive(): null }"
                  :title="item.title"

                  @click="item.action"
                >
                  <i :class="`ri-${item.icon} `" />
                </button>
              </div>
            </div>
            <div class="divider" />
            <editor-content :editor="editor" />
          </div>
          <div class="flex space-x-2">
            <div 
              v-for="tag in tags"
              :key="tag.id"
            >
              <div class="badge badge-primary mt-4">
                {{ tag.name }}
              </div>
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
    <div 
      v-else 
      class="card-compact rounded-lg w-96 bg-neutral text-neutral-content v-0"
    >
      <div class="card-body">
        <div class="flex">
          <editor-content :editor="titleEditor" />
        </div>
        <editor-content :editor="editor" />
        <div class="flex space-x-2">
          <div 
            v-for="tag in tags"
            :key="tag.id"
          >
            <div class="badge badge-primary">
              {{ tag.name }}
            </div>
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

<script>
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Editor, EditorContent } from '@tiptap/vue-3'
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
    },
  },
  emits: ['deleteNote'],
  data(props) {
    const loadModal = false
    return {
      loadModal,
      tags: [],
      noteID: props.id,
      noteTitle: props.title,
      noteBody: props.body,
      titleEditor: null,
      editor: null,
      items: [
        {
          icon: 'bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'strikethrough',
          title: 'Strike',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike'),
        },
        {
          icon: 'code-view',
          title: 'Code',
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive('code'),
        },
        {
          icon: 'mark-pen-line',
          title: 'Highlight',
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive('highlight'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'h-1',
          title: 'Heading 1',
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1 }),
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 2 }),
        },
        {
          icon: 'paragraph',
          title: 'Paragraph',
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive('paragraph'),
        },
        {
          icon: 'list-unordered',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'list-ordered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList'),
        },
        {
          icon: 'list-check-2',
          title: 'Task List',
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive('taskList'),
        },
        {
          icon: 'code-box-line',
          title: 'Code Block',
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive('codeBlock'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'double-quotes-l',
          title: 'Blockquote',
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive('blockquote'),
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'text-wrap',
          title: 'Hard Break',
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: 'format-clear',
          title: 'Clear Format',
          action: () => this.editor.chain()
            .focus()
            .clearNodes()
            .unsetAllMarks()
            .run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'arrow-go-back-line',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: 'arrow-go-forward-line',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run(),
        },
      ],
    }
  },
  mounted() {
    this.titleEditor = new Editor({
      content: this.noteTitle,
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
    this.editor = new Editor({
      content: this.noteBody,
      extensions: [
        Document,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
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

    async () => {
      const supabase = useSupabaseClient()
      const { data } = await supabase.from('id, tags').select('name').eq('note_id', this.noteID)
      if (data) {
        tags.value = data  
      }
    }
  },
  beforeUnmount() {
    this.titleEditor.destroy()
    this.editor.destroy()
  },
  methods: {
    toggleModal() {
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
        .update({ title: this.titleEditor.getHTML(), body: this.editor.getHTML() })
        .eq('id', this.id)
        // Flash success here
    }
  }
}
</script>

<style lang="scss">
  body{
    max-width: 30rem;
  }
  .centre-buttons{
    text-align: center;
  }
  .centre-buttons button{
  margin: 1rem;
  }
  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    p {
      margin: 0;
    }

    li {
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
  .menu-item {
    border-radius: 0.4rem;
  &.is-active,
  &:hover {
    color: #0D0D0D;
    background-color: #FFF;
  }
}
</style>
