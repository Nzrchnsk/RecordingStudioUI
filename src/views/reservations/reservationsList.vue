<template>
    <div class="card">
        <div class="card-header">Бронирования</div>
        <div class="card-body">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Номер бронирования</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Студия</th>
                    <th scope="col">Дата бронирования</th>
                    <th scope="col">Время от</th>
                    <th scope="col">Время до</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in reserves">
                    <td>{{item.id}}</td>
                    <td>{{item.user.userName}}</td>
                    <td>{{item.studio.name}}</td>
                    <td>{{item.fromDateTime}}</td>
                    <td>{{item.fromTime}}</td>
                    <td>{{item.toTime}}</td>
                    <td>
                        <button type="button" v-if="admin" @click="deleteReserves(item.id)" class="btn btn-danger btn-sm">
                            Отменить бронирование
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import Api from '/src/components/db'
    import moment from "moment";
    export default {
        name: "Reserve",
        data() {
            return {
                reserves: [],
            };
        },
        components: {
            Api,
        },
        mounted() {
            this.getReserves();
        },
        methods: {
            async deleteReserves(id) {
                try {
                    this.reserves = await Api.Delete('reservations/' + id);
                    this.getReserves();
                } catch (e) {
                    console.log(e)
                }
            },
            async getReserves() {
                try {
                    let {data} = await Api.Get('reservations');
                    this.reserves = data;
                    for(let i = 0; i < this.reserves.length; i++) {
                        this.reserves[i].fromDateTime = moment(this.reserves[i].fromDateTime).format('YYYY-MM-DD');
                        this.reserves[i].fromTime = moment(this.reserves[i].fromDateTime).format('hh:mm');
                        this.reserves[i].toTime = moment(this.reserves[i].toDateTime).format('hh:mm');
                    }
                } catch (e) {
                    console.log(e)
                }
            },
        },
        computed: {
            admin() {
                return localStorage.getItem('role') === 'Admin'
            },
        },
    };
</script>