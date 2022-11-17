<template>
  <a-menu
    v-model:selectedKeys="current"
    mode="horizontal"
    style="justify-content: center; font-weight: bold;"
  >
    <a-menu-item
      key="notes"
      style="justify-content: center;margin-right: 6vw"
    >
      <template #icon>
        <BookOutlined />
      </template>
      Notes
    </a-menu-item>
    <a-menu-item
      key="todos"
      style="justify-content: center;"
    >
      <template #icon>
        <ProjectOutlined />
      </template>
      Kanban
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BookOutlined, ProjectOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      BookOutlined,
      ProjectOutlined,
    },
    setup() {
      const current = ref<string[]>(['mail']);
      return {
        current,
      };
    },
  });
</script>
