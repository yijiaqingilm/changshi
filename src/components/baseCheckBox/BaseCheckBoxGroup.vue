<template>
    <div class="list-block">
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<script>
  export default {
    name: '',
    componentName: 'baseCheckBoxGroup',
    props: {
      value: {}
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>