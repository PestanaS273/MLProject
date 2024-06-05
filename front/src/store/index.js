import { createStore } from 'vuex'
import createPersitedState from 'vuex-persistedstate'


export default createStore({
    state: {
        user: null,
        token: null,
        isLogged: false,
        queryPerplexity: null,
        setNews: null

    },
    getters: {
        getUser: state => {
            return state.user;
        },
        getToken: state => {
            return state.token;
        },
        getIsLogged: state => {
            return state.isLogged;
        },
        getQueryPerplexity: state => {
            return state.queryPerplexity;
        },
        getNews: state => {
            return state.setNews;
        }

    },
    mutations: {
        setUser(state, user) {
            console.log(user);
            state.user = user;
        },
        setToken(state, token) {
            console.log(token);
            state.token = token;
        },
        setIsLogged(state, isLogged) {
            console.log(isLogged);
            state.isLogged = isLogged;
        },
        setQueryPerplexity(state, queryPerplexity) {
            console.log(queryPerplexity);
            state.queryPerplexity = queryPerplexity;
        },
        setNews(state, setNews) {
            console.log(setNews);
            state.setNews = setNews;
        }

    },
    actions: {
        setUser(context, user) {
            context.commit('setUser', user);
        },
        setToken(context, token) {
            context.commit('setToken', token);
        },
        setIsLogged(context, isLogged) {
            context.commit('setIsLogged', isLogged);
        },
        setQueryPerplexity(context, queryPerplexity) {
            context.commit('setQueryPerplexity', queryPerplexity);
        },
        setNews(context, setNews) {
            context.commit('setNews', setNews);
        }

    },
    plugins: [createPersitedState({
        paths: ['user', 'token', 'isLogged', 'queryPerplexity', 'setNews']
    })]
})