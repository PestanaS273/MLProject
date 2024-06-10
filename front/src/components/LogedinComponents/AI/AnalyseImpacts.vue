<template>
    <div >
        <button class="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border border-purple-500 rounded" @click="fetchImpacts">Which Impacts Does It Have?</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OpenAI from "openai";
const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

 
export default {

    methods: {
        async fetchImpacts() {
            const query = this.$store.getters.getAnswerPerplexityFormated
            console.log(query);
            try{
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {role: 'system', content: 'You are a specialist analysing impacts. You will compare the news to previous news and give a detailed analysis of the impacts. Your analysis should be based on finance, politics, or social'},
                        {role: 'user', content: query},
                    ],
                });
                console.log(response);
                const botReply = response.choices[0].message.content.trim();

                this.$emit('assistant-created', { title: 'Analyse impacts', content: botReply });

            } catch (error) {
                console.error(error);
            }
        }
    },
    computed: {
        ...mapGetters([
            'getAnswerPerplexityFormated'
        ]),
    }

}


</script>