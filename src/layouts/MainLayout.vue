<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Figurinhas
        </q-toolbar-title>
        <q-space />
        <q-btn icon="mdi-camera-flip-outline" flat @click="switchWebCam"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useAppOptions } from 'src/composables/useAppOptions';

const { switchWebCam } = useAppOptions();
</script>
