<template>
    <svg :width="`${width || 14}`" :height="`${height || 14}`">
        <use :xlink:href="`#icon-${name}`" :style="`fill:${fill || '#fff'}`"></use>
    </svg>
</template>

<script>
    const request = require.context('~/assets/icons_svg', false, /\.svg$/);
    request.keys().forEach(request);
    export default {
        name: 'svg_icon',
        props: ['name', 'fill', 'width', 'height']
    }
</script>

<style scoped>
    svg {
        vertical-align: middle;
    }
</style>