<template>
    <div data-example-ui-box>
        <h1>这是一个写公共UI组件的例子</h1>
    </div>
</template>

<script>
    export default {
        name: 'EmExample'
    }
</script>

<style lang="scss">
    div[data-example-ui-box] {
        h1{
            text-align: center;
            color: #00ffff;
        }
    }
</style>
