<template>
  <div class="theme" :class="pageClasses">
    <NavBar v-if="showNavbar" @toggle="toggleSidebar">
      <template #search>
        <slot name="navbar-search">
          <AlgoliaSearchBox v-if="theme.algolia" :options="theme.algolia" />
        </slot>
      </template>
    </NavBar>

    <SideBar :open="openSideBar">
      <template #sidebar-top>
        <slot name="sidebar-top" />
      </template>
      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>
    </SideBar>
    <!-- TODO: make this button accessible -->
    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Content v-if="isCustomLayout" />

    <Home v-else-if="enableHome">
      <template #hero>
        <slot name="home-hero" />
      </template>
      <template #features>
        <slot name="home-features" />
      </template>
      <template #footer>
        <slot name="home-footer" />
      </template>
    </Home>

    <Page v-else />
  </div>

  <Debug />
</template>

<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import { useRoute, useData } from 'vitepress';
import {
  isSideBarEmpty,
  getSideBarConfig,
} from 'vitepress/dist/client/theme-default/support/sideBar';
import type { DefaultTheme } from 'vitepress/dist/client/theme-default/config';
// components
import NavBar from './components/NavBar.vue';
import SideBar from 'vitepress/dist/client/theme-default/components/SideBar.vue';
import Page from 'vitepress/dist/client/theme-default/components/Page.vue';
const Home = defineAsyncComponent(
  () => import('vitepress/dist/client/theme-default/components/Home.vue')
);

const NoopComponent = () => null;

const AlgoliaSearchBox = __ALGOLIA__
  ? defineAsyncComponent(
      () =>
        import(
          'vitepress/dist/client/theme-default/components/AlgoliaSearchBox.vue'
        )
    )
  : NoopComponent;

// generic state
const route = useRoute();
const { site: siteRouteData, page, theme, title, frontmatter } = useData();
// custom layout
const isCustomLayout = computed(() => !!route.data.frontmatter.customLayout);
// home
const enableHome = computed(() => !!route.data.frontmatter.home);
// navbar
const showNavbar = computed(() => {
  if (frontmatter.value.navbar === false || theme.value.navbar === false) {
    return false;
  }
  return title.value || theme.value.logo || theme.value.repo || theme.value.nav;
});
// sidebar
const openSideBar = ref(false);
const showSidebar = computed(() => {
  if (frontmatter.value.home || frontmatter.value.sidebar === false) {
    return false;
  }
  return !isSideBarEmpty(
    getSideBarConfig(theme.value.sidebar, route.data.relativePath)
  );
});
const toggleSidebar = (to?: boolean) => {
  openSideBar.value = typeof to === 'boolean' ? to : !openSideBar.value;
};
const hideSidebar = toggleSidebar.bind(null, false);
// close the sidebar when navigating to a different location
watch(route, hideSidebar);
// TODO: route only changes when the pathname changes
// listening to hashchange does nothing because it's prevented in router
// page classes
const pageClasses = computed(() => {
  return [
    {
      'no-navbar': !showNavbar.value,
      'sidebar-open': openSideBar.value,
      'no-sidebar': !showSidebar.value,
    },
  ];
});
</script>
