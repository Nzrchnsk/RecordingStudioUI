<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card card-login">
                    <form class="box-login">
                        <h1>Регистрация</h1>
                        <p class="text-muted"> Пожалуйста введите свой логин и пароль!</p>
                        <input type="email" v-model="data.userName" placeholder="Имя пользователя">
                        <input type="email" v-model="data.email" placeholder="Почта">
                        <input type="password" v-model="data.password" placeholder="Пароль">
                        <div v-if="invalidValidation" class="mb-2 validation-failed"><label><small>Пожалуйста заполните все поля</small></label></div>
                        <div v-if="invalidData" class="mb-2 validation-failed"><label><small>Неверные данные для входа</small></label></div>
                        <input type="button" @click="registration" value="Зарегистрироваться">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Api from '/src/components/db'

    export default {
        data() {
            return {
                invalidValidation : false,
                invalidData : false,
                data : {
                    email: '',
                    password: '',
                    userName: '',
                },
            }
        },
        components: {
            Api
        },
        methods: {
            async registration() {
                this.invalidValidation = false;
                this.invalidData = false;
                if (!this.data.email || !this.data.password || !this.data.userName) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    let {data} = await Api.Post('account/registration', this.data);
                    localStorage.setItem('auth', data.accessToken)
                    localStorage.setItem('role', data.role)
                    window.location = '/records_studios';
                } catch (e) {
                    this.invalidData = true;
                    console.log(e)
                }
            },
        },
    }
</script>