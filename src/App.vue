<template>
  <v-app>
    <!-- <v-btn @click="() => dialog=true">AAA</v-btn> -->
    <!-- <v-text-field max-height="20px" @mouseover="() => dialog=true" /> -->
    <!-- <iconifier :toggle="dialog" noButton=true @selectIcon="catchSelected" @toggle="toggleEvent" lang="en_US"></iconifier> -->
    <!-- <iconifier :toggle="dialog" mode="button" @selectIcon="catchSelected" @toggle="toggleEvent" lang="en_US"></iconifier> -->
    <!-- <iconifier :noButton="false" @selectIcon="catchSelected"/> -->
    <v-btn color=primary @click="() => dialog=true">AAA</v-btn>
    <iconifier @selectIcon="catchSelected" :toggle="dialog" @toggle="toggleEvent"/>
    {{selection}}
  </v-app>
</template>

<script>

import iconifier from './components/iconifier.vue';

export default {
  name: 'App',

  components: {
    iconifier
  },

  data: () => ({
    selection:'',
    dialog:false,
  }),
  methods: {
    catchSelected(selectedIcon){
      this.selection = selectedIcon;
    },
    toggleEvent(event){
      this.dialog = event;
    }
  }
};
</script>
