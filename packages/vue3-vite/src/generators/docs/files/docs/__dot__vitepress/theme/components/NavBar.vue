<template>
  <header class="nav-bar">
    <ToggleSideBarButton @toggle="$emit('toggle')" />

    <NavBarTitle />

    <div class="flex-grow" />

    <div class="nav">
      <NavLinks />
    </div>

    <slot name="search" />
  </header>
</template>

<script setup lang="ts">
import NavBarTitle from './NavBarTitle.vue';
import NavLinks from 'vitepress/dist/client/theme-default/components/NavLinks.vue';
import ToggleSideBarButton from 'vitepress/dist/client/theme-default/components/ToggleSideBarButton.vue';
defineEmits(['toggle']);
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--c-divider);
  padding: 0.7rem 1.5rem 0.7rem 4rem;
  height: var(--header-height);
  background-color: var(--c-bg);
}
@media (min-width: 720px) {
  .nav-bar {
    padding: 0.7rem 1.5rem;
  }
}
.flex-grow {
  flex-grow: 1;
}
.nav {
  display: none;
}
@media (min-width: 720px) {
  .nav {
    display: block;
  }
}
</style>
