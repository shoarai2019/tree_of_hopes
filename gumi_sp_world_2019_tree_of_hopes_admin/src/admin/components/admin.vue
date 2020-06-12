<template>
    <div>
        <div class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a href="/admin" class="navbar-item">管理画面</a>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "admin",
        data() {
            return {
                showNavigation: false
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">

</style>
