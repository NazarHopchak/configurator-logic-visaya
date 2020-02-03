<template>
  <div>
    <h4 class="dropdown-title"> {{ title }} </h4>
    <select v-model="selectedOption" class="form-control">
      <option v-for="(value, index) in allowedValues" :key="index" :value=value>
        {{ value.title }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';
import { DropdownOption, ExclusionRule } from '../models/models';

export default Vue.extend({
  name: 'OptionsDropdown',
  props: {
    title: String,
    id: String,
    values: {
      type: Array as () => DropdownOption[],
    },
    exclusions: {
      type: Array as () => ExclusionRule[],
    },
    globalSelectedOptions: {
      type: Array as () => DropdownOption[],
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  watch: {
    selectedOption(newOption: DropdownOption, oldOption: DropdownOption) {
      const globalSelectedOptions = this.globalSelectedOptions.valueOf() as DropdownOption[];
      if (oldOption) _.remove(globalSelectedOptions, o => o.option_type_id === oldOption.option_type_id);
      if (newOption) globalSelectedOptions.push(newOption);
    },
  },
  computed: {
    allowedValues() {
      const selectedOptionsTypes = _.map(this.globalSelectedOptions, o => o.option_type_id);
      if (!selectedOptionsTypes || !selectedOptionsTypes.length) return this.values;
      const incompatibleOptionsTypes = _.map(this.exclusions, v => _.keys(v));
      if (!incompatibleOptionsTypes || !incompatibleOptionsTypes.length) return this.values;
      return _.filter(this.values, v => !isOptionTypeDisabled(v.option_type_id, selectedOptionsTypes, incompatibleOptionsTypes));
    },
  },
});

function isOptionTypeDisabled(optionType: string, selectedOptionsTypes: string[], incompatibleOptionsTypes: string[][]) {
  if (!selectedOptionsTypes || !selectedOptionsTypes.length) return false;
  return _.some(incompatibleOptionsTypes, (incompatibleTypesSet) => {
    const isOptionTypeInTheSet = _.includes(incompatibleTypesSet, optionType);
    if (!isOptionTypeInTheSet) return false;
    const areAllOtherSetValuesSelected = _.chain(incompatibleTypesSet).without(optionType).difference(selectedOptionsTypes).value().length === 0;
    return areAllOtherSetValuesSelected;
  });
}

</script>

<style scoped>
.dropdown-title {
  margin-bottom: 10px;
}
</style>
