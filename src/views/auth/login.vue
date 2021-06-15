<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card card-login">
                    <form class="box-login">
                        <h1>Авторизация</h1>
                        <p class="text-muted"> Пожалуйста введите свой логин и пароль!</p>
                        <input type="email" v-model="data.userName" placeholder="Имя пользователя">
                        <input type="password" v-model="data.password" placeholder="Пароль">
                        <div v-if="invalidValidation" class="mb-2 validation-failed"><label><small>Пожалуйста заполните все поля</small></label></div>
                        <div v-if="invalidData" class="mb-2 validation-failed"><label><small>Неверные данные для входа</small></label></div>
                        <input type="button" @click="login" value="Войти" href="#">
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
                    userName: '',
                    password: '',
                },
            }
        },
        components: {
            Api
        },
        methods: {
            async login() {
                this.invalidValidation = false;
                this.invalidData = false;
                if (!this.data.userName || !this.data.password) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    let {data} = await Api.Post('account/login', this.data);
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
<style>
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background: linear-gradient(to right, #b92b27, #1565c0)
    }

    .validation-failed {
        color: #D42F2F;
    }

    .card-login {
        margin-bottom: 20px;
        border: none
    }

    .box-login {
        width: 500px;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 70%;
        background: #191919;
    ;
        text-align: center;
        transition: 0.25s;
        margin-top: 150px
    }

    .box-login input[type="email"],
    .box-login input[type="password"] {
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #3498db;
        padding: 10px 10px;
        width: 250px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s
    }

    .box-login h1 {
        color: white;
        text-transform: uppercase;
        font-weight: 500
    }

    .box-login input[type="email"]:focus,
    .box-login input[type="password"]:focus {
        width: 300px;
        border-color: #2ecc71
    }

    .box-login input[type="button"] {
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #2ecc71;
        padding: 14px 40px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        cursor: pointer
    }

    .box-login input[type="button"]:hover {
        background: #2ecc71
    }

    ul.social-network {
        list-style: none;
        display: inline;
        margin-left: 0 !important;
        padding: 0
    }

    ul.social-network li {
        display: inline;
        margin: 0 5px
    }

    .social-network a.icoFacebook:hover {
        background-color: #3B5998
    }

    .social-network a.icoTwitter:hover {
        background-color: #33ccff
    }

    .social-network a.icoGoogle:hover {
        background-color: #BD3518
    }

    .social-network a.icoFacebook:hover i,
    .social-network a.icoTwitter:hover i,
    .social-network a.icoGoogle:hover i {
        color: #fff
    }

    .social-circle li a {
        display: inline-block;
        position: relative;
        margin: 0 auto 0 auto;
        border-radius: 50%;
        text-align: center;
        width: 50px;
        height: 50px;
        font-size: 20px
    }

    .social-circle li i {
        margin: 0;
        line-height: 50px;
        text-align: center
    }

    .social-circle li a:hover i,

    .social-circle i {
        color: #fff;
        transition: all 0.8s;
        transition: all 0.8s
    }
</style>