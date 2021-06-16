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
                    <th scope="col">Время</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in reserves">
                    <td>{{item.number}}</td>
                    <td>{{item.user.userName}}</td>
                    <td>{{item.studioName}}</td>
                    <td>{{item.reservations_date}}</td>
                    <td>{{item.reservations_time}}</td>
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
                        this.reserves[i].reservations_date = moment(this.tickets[i].reservations_date).format('YYYY-MM-DD');
                        this.reserves[i].reservations_time = moment(this.tickets[i].reservations_date).format('HH:mm');
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