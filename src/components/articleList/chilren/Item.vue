<template>
    <div @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: '',
    methods: {
      handleClick () {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>

</style>