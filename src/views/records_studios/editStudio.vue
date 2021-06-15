<template>
    <div class="card">
    <div class="card-header">{{title}}</div>
    <div class="card-body">
        <input type="text" required v-model="data.name" class="form-control mb-2" placeholder="Название студии" aria-label="Username" aria-describedby="basic-addon1">
        <input type="text" required v-model="data.description" class="form-control mb-2" placeholder="Описание студии" aria-label="Username" aria-describedby="basic-addon1">
        <input type="text" required v-model="data.address" class="form-control mb-2" placeholder="Адрес студии" aria-label="Username" aria-describedby="basic-addon1">
        <input type="text" required v-model="data.price" class="form-control mb-2" placeholder="Цена" aria-label="Username" aria-describedby="basic-addon1">
        <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
        <button type="button" @click="save" class="btn btn-outline-success">
            Сохранить
        </button>
    </div>
    </div>
</template>
<script>
    import Api from '/src/components/db'

    export default {
        data() {
            return {
                invalidValidation : false,
                title: '',
                data : {
                    name: '',
                    description: '',
                    address: '',
                    price: '',
                },
            }
        },
        mounted() {
            if (this.$route.params.studioId) {
                this.getStudios();
            }
            if (this.$route.params.studioId) {
                this.title = 'Редактирование студии';
            } else {
                this.title = 'Создание студии';
            }
        },
        components: {
          Api
        },
        methods: {
            async studioEdit() {
                this.invalidValidation = false;
                if (!this.data.name || !this.data.description || !this.data.address || !this.data.price) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    await Api.Put('studios/' + this.$route.params.studioId, this.data);
                    this.$router.push({name: 'studiosList'});
                } catch (e) {
                    console.log(e)
                }
            },
            async studioCreate() {
                this.invalidValidation = false;
                if (!this.data.name || !this.data.description || !this.data.address || !this.data.price) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    await Api.Post('studios', this.data);
                    this.$router.push({name: 'studioList'});
                } catch (e) {
                    console.log(e)
                }
            },
            async getStudios() {
                try {
                    let {data} = await Api.Get('studios/' + this.$route.params.studioId);
                    this.data = data;
                } catch (e) {
                    console.log(e)
                }
            },
            save() {
                if (this.$route.params.studioId) {
                    this.studioEdit();
                } else {
                    this.studioCreate();
                }
            }
        },
    }
</script>
