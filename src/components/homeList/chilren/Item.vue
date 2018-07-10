<template>
    <div class="home-item">
        <div>{{title}}</div>
        <div v-if="$slots.after">
            <slot name="after"></slot>
        </div>
        <div v-else v-html="after"></div>
    </div>
</template>

<script>
  export default {
    name: '',
    props: {
      title: String,
      after: String
    }
  }
</script>

<style scoped>
    .home-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .active {
        color: #6699FF;
    }
</style>