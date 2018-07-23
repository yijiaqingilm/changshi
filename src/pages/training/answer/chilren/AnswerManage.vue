<template>
    <div>
        <base-form-group class='form-group' label="级别选择" isTitle>
            <base-select v-model="leavel"></base-select>
        </base-form-group>
        <section>
            <answer-tabs>
                <answer-tab>xx专业2</answer-tab>
                <answer-tab>xx专业2</answer-tab>
                <answer-tab>xx专业2</answer-tab>
                <answer-tab>xx专业2</answer-tab>
            </answer-tabs>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        leavel: ''
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .form-group {
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        padding: 30px;
    }
</style>
