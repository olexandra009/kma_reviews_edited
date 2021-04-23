import userApi from "../../api/userApi";
import {router} from "../../main.js"


const state = {user: {}, token: ""};
const getters = {};

const actions = {
    async signIn({commit, state},{email, password}){
        let response = await userApi.postSignIn({email, password});
        if(response===null) return false;
        commit('addTokenMutation', response);
        if (response.token) {
            router.push("/")
        }
        return true;
    },

    async signUp({commit, state},{email, password}){
        let response = await userApi.postSignUp({email, password});
        if(response===null) return false;
        router.push("/login")
        return true;
    },
};

const mutations = {
    addTokenMutation(state, credentials){
        state.user = credentials.user
        state.token = credentials.token
    },
 };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};