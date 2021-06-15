<template>
    <header class="p-3 text-white header-color">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src="../../assets/logo.jpg" width="60" height="60">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li v-if="auth"><a href="/records_studios" class="nav-link px-2 text-white">Студии звукозаписи</a></li>
                    <li v-if="auth" ><a href="/reservations" class="nav-link px-2 text-white">Бронирования</a></li>
                    <li v-if="auth && admin"><a href="/users" class="nav-link px-2 text-white">Пользователи</a></li>
                </ul>

                <div class="text-end">
                    <button type="button" @click="login" v-if="!auth" class="btn btn-light me-2">Войти</button>
                    <button type="button" @click="registration" v-if="!auth" class="btn btn-light me-2">Зарегистрироваться</button>
                    <button type="button" v-if="auth" @click="logout" class="btn btn-light me-2">Выйти</button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        methods: {
            login() {
                this.$router.push({name: 'login'});
            },
            registration() {
                this.$router.push({name: 'registration'});
            },
            logout() {
                localStorage.clear();
                window.location = '/login';
            },
        },
        computed: {
            auth() {
                return localStorage.getItem('auth');
            },
            admin() {
                return localStorage.getItem('role') === 'Admin';
            },
        },
    }
</script>
<style>
    .header-color {
        background-color: #252326;
    }
</style>