<template>
  <a
    class="nav-bar-title"
    :href="withBase(localePath)"
    :aria-label="`${title}, back to home`"
  >
    <img
      v-if="theme.logo"
      class="logo"
      :src="withBase(theme.logo)"
      alt="Logo"
    />
    {{ site.navTitle }}
  </a>
</template>

<script lang="ts" setup>
import { withBase, useData } from 'vitepress';

const { localePath, theme, title, site } = useData();
</script>

<style scoped>
.nav-bar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--c-text);
}
.nav-bar-title:hover {
  text-decoration: none;
}
.logo {
  margin-right: 0.75rem;
  height: 28px;
  vertical-align: bottom;
}
</style>
