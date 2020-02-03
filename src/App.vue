<template>
  <div id="app" class="form-group">
    <div v-for="(option, index) in options" :key="index" class="col-xs-12 dropdown-container">
      <OptionsDropdown class="col-xs-4"
        v-bind="option"
        :exclusions="exclusions"
        :global-selected-options="globalSelectedOptions"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import OptionsDropdown from './components/OptionsDropdown.vue';

import data from './data.json';
import { Dropdown, ExclusionRule, DropdownOption } from './models/models';

const options = data.options as Dropdown[];
const exclusions = data.exclusions as ExclusionRule[];

// in a bigger project I would use a state management tool as Vuex
// yet, as the project is really tiny one just the following object(array) will be used to store the state
// each component receives the reference to the object, and so can modify it utilizing the possibilities of the reference types
const globalSelectedOptions: DropdownOption[] = [];

export default Vue.extend({
  name: 'app',
  data() {
    return {
      options,
      exclusions,
      globalSelectedOptions,
    };
  },
  components: {
    OptionsDropdown,
  },
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.dropdown-container {
  margin-bottom: 20px;
}
</style>
