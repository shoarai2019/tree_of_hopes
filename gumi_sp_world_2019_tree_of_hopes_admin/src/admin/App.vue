<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap');
    /*@import url('https://fonts.googleapis.com/css?family=Noto+Serif+JP&display=swap');*/

    html, body {
        font-family: 'Noto Sans JP', sans-serif;
        /*font-family: 'Noto Serif JP', serif;*/
    }

    #app {
        font-family: 'Noto Sans JP', sans-serif;
        /*font-family: 'Noto Serif JP', serif;*/
    }

    .pagination-list {
        margin-top: 0;
        margin-left: 0;

        li {
            list-style: none;
        }
    }
</style>
