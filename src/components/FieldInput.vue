<template>
  <label
    class="field-input"
    :style="{
        ...(label ? {paddingTop: '2em'} : {})
      }">
    <span class="field-label" v-if="label">{{ label }}</span>
    <input
      class="field-text"
      type="text"
      v-model="field"
      :placeholder="placeholder"
      @blur="evaluate = true"
      @focus="evaluate = false">
    <span v-if="evaluate && field && !validator(field)">{{ errorMessage }}</span>
  </label>
</template>

<script>
export default {
  name: 'FieldInput',
  props: {
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    validator: {
      type: Function,
      default: v => v.length > 1
    },
    errorMessage: {
      type: String,
      default: 'Please enter a valid input'
    }
  },
  data () {
    return {
      evaluate: false
    }
  },
  computed: {
    field: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.field-input {
  position: relative;
  width: 100%;
  padding-top: 1.25em;
}
.field-label {
  position: absolute;
  font-size: 0.75em;
  top: .5em;
}
.field-text {
  box-sizing: border-box;
  font-size: 14px;
  line-height: 2.5em;
  border-radius: 4px;
  border: 1px solid rgb(158, 176, 184);
  padding-left: 1em;
  width: 100%;
}
</style>
