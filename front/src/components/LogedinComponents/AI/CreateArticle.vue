<template>
    <div >
        <button class="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border border-purple-500 rounded" @click="createArticle">Create an Article</button>
    </div>
</template>

<script>
import OpenAI from "openai";
const openai = new OpenAI({apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

 
export default {

    methods: {
        async createArticle() {
            const assistant = await openai.beta.assistants.create({
                name: "Article Specialist",
                instructions: "You are a specialist in writing articles. First give the most important Headlines, then write a 500 words article of: " + this.query,
                model: "gpt-3.5-turbo"
            });
        }
    },

}


</script>