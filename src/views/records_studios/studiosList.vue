<template>
    <div class="card">
        <div class="card-header">Студии звукозаписи</div>
        <div class="card-body">
            <button type="button" @click="addStudio" class="btn btn-success btn-sm">
                Добавить студию
            </button>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Название студии</th>
                    <th scope="col">Описание студии</th>
                    <th scope="col">Адрес студии</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in studios">
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <button type="button" @click="studioBroned(item.id)" data-bs-toggle="modal" data-bs-target="#studioBroned" class="btn btn-info  me-2 btn-sm">
                            Забронировать
                        </button>

                        <button type="button" @click="editStudio(item.id)" class="btn btn-secondary btn-sm me-2">
                           Редактировать
                        </button>

                        <button type="button" @click="deleteStudio(item.id)" class="btn btn-danger btn-sm">
                            Удалить
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="studioBroned" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Бронирование студии</h5>
                </div>
                <div class="modal-body">
                    <datepicker v-model="modal.date" required class="form-select mb-2" placeholder="Выберите дату бронирования"></datepicker>

                    <input  class="form-control mb-2" v-maska="'##'" v-model="modal.fromTime" placeholder="Время начала">
                    <input  class="form-control mb-2" v-maska="'##'" v-model="modal.toTime" placeholder="Время конца">
                    <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="broned" class="btn btn-primary">Забронировать</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import Datepicker from 'vue3-datepicker'
    import { maska } from 'maska'
    import Api from '/src/components/db'
    export default {
        directives: { maska },
        name: "Studios",
        data() {
            return {
                invalidValidation : false,
                modal: {
                    studioId: null,
                    date: null,
                    fromTime: null,
                    toTime: null,
                },
                studios: [],
            };
        },
        components: {
            Api,
            Datepicker,
        },
        mounted() {
            this.getStudios();
        },
        methods: {
            studioBroned(studio_id) {
                this.modal.studioId = studio_id;
            },
            async broned() {
                this.invalidValidation = false;
                if (!this.modal.date || !this.modal.fromTime || !this.modal.toTime) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    await Api.Post('reservation', this.modal).then(response => {
                        if (response.data === false) {
                            alert('Выбранное время уже занято');
                        } else {
                            alert('Студия успешно забронирована');
                            $('#studioBroned').modal('hide')
                            this.modalClear();
                        }
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            modalClear() {
                this.modal.date = null;
                this.modal.fromTime = null;
                this.modal.toTime = null;
                this.modal.studioId = null;
            },
            editStudio(id) {
                this.$router.push({name: 'studioEdit', params: {studioId: id}});
            },
            addStudio() {
                this.$router.push({name: 'studioCreate'});
            },
            async deleteStudio(id) {
                try {
                    this.studios = await Api.Delete('studios/' + id);
                    this.getStudios();
                } catch (e) {
                    console.log(e)
                }
            },
            async getStudios() {
                try {
                    let {data} = await Api.Get('studios');
                    this.studios = data
                } catch (e) {
                    console.log(e)
                }
            },
        },
    };
</script>