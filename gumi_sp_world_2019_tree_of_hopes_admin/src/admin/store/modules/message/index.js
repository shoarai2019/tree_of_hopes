import axios from 'axios'

const state = {
    messagesData: null,
    messagesFetched: false
};

const mutations = {
    setMessagesData(store, data) {
        state.messagesData = data;
        state.messagesFetched = true;
    }
};

const actions = {
    async getAll(context, params) {
        let limit = 10,
            offset = 0;

        if (context.getters.messagesMetadata) {
            limit = context.getters.messagesMetadata.limit;
            offset = context.getters.messagesMetadata.offset;
        }

        if (params.limit) {
            limit = params.limit;
        }
        if (params.offset) {
            offset = params.offset;
        }

        offset = limit * (params.pageNumber - 1);

        const url = `http://${process.env.API_HOST}/api/admin/messages?limit=${limit}&offset=${offset}`;

        const res = await axios.get(url)
            .catch(err => err.response || err);

        if (res.status === 200) {
            context.commit('setMessagesData', res.data);
        } else {

        }
    },
    async update(context, params) {
        const url = `http://${process.env.API_HOST}/api/admin/messages/${params.id}`;

        delete params.id;
        delete params.createdAt;

        const res = await axios.put(url, params).catch(err => err.response || err);

        if (res.status === 200) {

        } else if (res.status === 406) {
            console.log(res);
        } else {

        }
    }
};

const getters = {
    messages(state) {
        if (state.messagesFetched) {
            return state.messagesData.messages;
        } else {
            return null;
        }
    },
    messagesFetched(state) {
        return state.messagesFetched;
    },
    messagesMetadata(state) {
        if (state.messagesFetched) {
            return state.messagesData.metadata;
        } else {
            return null;
        }
    }
};

const messageModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default messageModule;
