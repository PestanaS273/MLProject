<template>
    <div class="space-x-4">
        <button class="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border border-purple-500 rounded" @click="fetchMostImportantNews">Most Important News</button>
        <button class="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border border-purple-500 rounded" @click="summarizeLastMonthsNews">Summarize Last Month's News</button>
        <button class="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border border-purple-500 rounded" @click="createArticle">Create an Article</button>
        <button class="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border border-purple-500 rounded" @click="fetchImpacts">Which Impacts Does It Have?</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['query'],

    methods: {
        fetchMostImportantNews() {
            // Make an API request to fetch the most important news
            axios.get('/api/most-important-news')
                .then(response => {
                    // Handle the response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        },
        summarizeLastMonthsNews() {
            // Make an API request to summarize the last month's news
            axios.get('/api/summarize-last-months-news')
                .then(response => {
                    // Handle the response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        },
        createArticle() {
            // Make an API request to create an article
            axios.post('/api/create-article', { title: 'New Article' })
                .then(response => {
                    // Handle the response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        },
        fetchImpacts() {
            // Make an API request to fetch the impacts
            axios.get('/api/fetch-impacts')
                .then(response => {
                    // Handle the response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        }
    }
};
</script>