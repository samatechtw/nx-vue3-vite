<template>
  <div class="cookies" @click="hide">
    {{ t('cookies') }}
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useStore } from '@app/store';

const { t } = useI18n();
const store = useStore();

const hide = () => {
  store.setCookiesAccepted(true);
};
</script>

<style lang="postcss" scoped>
@import '@assets/css/global.css';

.cookies {
  @mixin text 15px;
  color: $text-main;
  border: 2px solid black;
  margin-top: 16px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
