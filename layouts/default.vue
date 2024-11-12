<script setup lang="ts"></script>

<!-- layouts/default.vue -->
<template>
  <div>	
      <header>預設模板的表頭</header>
    <p>這是default，全部頁面都會使用到</p>
    <slot />
    <footer>預設模板的表尾</footer>
  </div>

</template>

<style scoped></style>
