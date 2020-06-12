<template>
    <div>
        <div class="section">
            <div class="container">
                <h1 class="title">メッセージ一覧</h1>

                <div class="content">
                    <table class="table is-bordered is-fullwidth">
                        <thead>
                        <tr>
                            <th class="id">ID</th>
                            <th class="createdAt">登録日時（JST）</th>
                            <th class="messageBody">メッセージ</th>
                            <th class="private">非公開</th>
                        </tr>
                        </thead>
                        <tbody v-if="messagesFetched">
                        <tr v-if="messages.length == 0">
                            <td colspan="4">
                                データがありません。
                            </td>
                        <tr v-else v-for="message in messages">
                            <td>{{message.id}}</td>
                            <td>
                                {{utcToJst(message.created_at)}}
                            </td>
                            <td v-bind:class="color(message)">
                                <img v-bind:src="imgSrc(message)" alt="">
                            </td>
                            <td class="private">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="message.private" @click="togglePrivate(message.id)">
                                </label>
                            </td>
                        </tr>
                        </tbody>
                        <tbody v-else>
                        <td colspan="4"></td>
                        </tbody>
                    </table>

                    <nav class="pagination is-centered" role="navigation" aria-label="pagination" v-if="needPagination">
                        <a class="pagination-previous" @click="previousPage">前</a>
                        <a class="pagination-next" @click="nextPage">次</a>
                        <ul class="pagination-list">
                            <li v-for="i in numberOfPages">
                                <a @click="changePage(i)"
                                   :class="{'pagination-link': true, 'is-current': pageNumber == i}"
                                   aria-label="Page i">{{i}}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    import utc from 'dayjs/plugin/utc'
    import WebSocketClient from "../../modules/web_socket_client";

    dayjs.extend(utc);

    export default {
        name: "messages",
        title: "メッセージ一覧",
        data() {
            return {
                pageNumber: 1,
                wsc: null
            }
        },
        computed: {
            messages() {
                return this.$store.getters['message/messages'];
            },
            messagesFetched() {
                return this.$store.getters['message/messagesFetched'];
            },
            messagesMetadata() {
                return this.$store.getters['message/messagesMetadata'];
            },
            needPagination() {
                if (this.messagesFetched) {
                    if (this.messagesMetadata.count > this.messagesMetadata.limit) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            numberOfPages() {
                if (this.messagesFetched) {
                    return Math.ceil(this.messagesMetadata.count / this.messagesMetadata.limit);
                } else {
                    return 1;
                }
            }
        },
        methods: {
            changePage(pageNumber) {
                this.pageNumber = pageNumber;
                let query = {
                    page: this.pageNumber
                };
                this.$router.push({name: 'messages', query: query});
                this.renderMessages();
            },
            color(message) {
                const body = JSON.parse(message.body);
                const color = `messageBody color${body.color}`
                return color;
            },
            imgSrc(message) {
                const body = JSON.parse(message.body);
                const strSVG = 'data:image/svg+xml,' + encodeURIComponent(body.canvas);
                return strSVG;
            },
            nextPage() {
                if (this.pageNumber < this.numberOfPages) {
                    this.pageNumber += 1;
                }

                this.changePage(this.pageNumber);
            },
            onmessage(e) {
                this.renderMessages();
            },
            previousPage() {
                if (this.pageNumber > 1) {
                    this.pageNumber -= 1;
                }

                this.changePage(this.pageNumber);
            },
            renderMessages() {
                if (this.$route.query.page) {
                    this.pageNumber = this.$route.query.page;
                }

                this.$store.dispatch('message/getAll', {
                    limit: 10,
                    offset: 0,
                    pageNumber: this.pageNumber
                })
            },
            togglePrivate(id) {
                let message = null;

                for (let i = 0; i < this.messages.length; i++) {
                    if (this.messages[i].id == id) {
                        message = this.messages[i];
                        break;
                    }
                }

                const params = {
                    id: id,
                    private: !message.private
                };
                this.$store.dispatch('message/update', params);
            },
            utcToJst(datetime) {
                const localDatetime = dayjs(datetime).format('YYYY年MM月DD日 HH:mm:ss', {timeZone: 'Asia/Tokyo'});
                return localDatetime;
            }
        },
        created() {
            this.renderMessages();
            this.wsc = new WebSocketClient(`ws://${process.env.WS_HOST}/ws`);
            this.wsc.onmessage = this.onmessage;
        }
    }
</script>

<style scoped lang="scss">
    table {
        .id {
            width: 2em;
        }

        .createdAt {
            width: 14em;
        }

        .messageBody {
            &.color0 {
                background-color: #6bc885;
            }

            &.color1 {
                background-color: #5db0ae;
            }

            &.color2 {
                background-color: #cccb52;
            }

            &.color3 {
                background-color: #e36b67;
            }
        }

        .private {
            width: 5em;
            text-align: center;
        }
    }
</style>
