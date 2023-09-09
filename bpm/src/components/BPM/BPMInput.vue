<template>
<v-row>
  <v-col cols="4" class="mt-0 mb-0 pt-0 pb-0">
    <h4 class="bpm-input__title" >
      <v-tooltip right max-width="300">
        <template v-slot:activator="{ on, attrs }">
          <span
            v-bind="helpText ? attrs : null"
            v-on="helpText ? on : null">
            <v-badge
              color="grey"
              content="?"
              overlap
              :value="+!!helpText"
            >
              <span style="white-space: pre-line" class="pr-2">
              {{text}}:
              </span>
            </v-badge>
          </span>
        </template>
        {{helpText}}
      </v-tooltip>
    </h4>
  </v-col>
  <v-col cols="6" class="mt-0 mb-0 pt-0 pb-0">
    <v-checkbox
      :disabled="readonly"
      off-icon="mdi-checkbox-blank-outline"
      on-icon="mdi-checkbox-marked-outline"
      v-if="isBoolean"
      v-model="value"
    ></v-checkbox>
    <v-select
      :disabled="readonly"
      item-text="title"
      item-value="code"
      v-else-if="isSelect"
      :items="items"
      v-model="value">
    </v-select>
    <v-text-field
      v-else
      :disabled="readonly"
      v-model="value"
    ></v-text-field>
  </v-col>
</v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: ['value', 'text', 'helpText', 'isBoolean', 'isSelect', 'items'],
  name: 'BPMInput',
  data () {
    return {
      rules: {
        required: value => !!value || 'Обязательное поле'
      }
    }
  },
  computed: {
    ...mapGetters('bpmContent', {readonly: 'readonly'})
  }
}
</script>

<style scoped>
.bpm-input__title {
  white-space: nowrap;
  text-align: right;
  margin-top: 10px;
}
</style>
