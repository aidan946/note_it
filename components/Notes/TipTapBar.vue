<template>
  <div class="flex text-lg h-8">
    <div v-for="(item, index) in items" :key="item.icon" class="p-1">
      <div v-if="item.type === 'divider'" :key="`divider${index}`">
        |
      </div>
      <button class="menu-item" :class="{ 'is-active': item.isActive ? item.isActive() : null }" :title="item.title"
        @click="item.action">
        <i :class="`ri-${item.icon} `" />
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({ editor: { type: Object, required: true } })
debugger
console.log(props.editor)

let editor = ref(props.editor)
// TODO fix actions
const items = [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),

  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),

  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),

  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive('code'),

  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive('highlight'),

  },
  {
    type: 'divider',
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),

  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),

  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),

  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),

  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),

  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => props.editor.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor.isActive('taskList'),

  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive('codeBlock'),

  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),

  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => props.editor.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => props.editor.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => props.editor.chain().focus().redo().run(),
  },
]
</script>

<style lang="scss">
body {
  max-width: 30rem;
}

.centre-buttons {
  text-align: center;
}

.centre-buttons button {
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

    >label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    >div {
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
