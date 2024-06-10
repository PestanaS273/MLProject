<script setup>

</script>
<template>
    <div class="flex justify-center mt-4 mx-4">
      <div class="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">News analysis for : </h5>
        </a>
        <br>
        <h4 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ getNews }}</h4>
        <p class="mb-3 my-2 font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600">
            Let AI make a quick search for more information!
        </p>
        <div v-if="!perplexityAnswered">
          <a href="#" @click.prevent="fetchNews" class="inline-flex items-center px-3 my-3 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded hover:from-purple-600 hover:to-purple-700 animate-pulse border border-purple-500">
              Click here
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
        <div v-if="loading" role="status">
            <svg aria-hidden="true" class="w-10 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <br><br>
        <div v-if="perplexityAnswered">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AI :</h5>
            <p class="mb-3 my-5 font-normal text-gray-700 dark:text-gray-400" v-html="formattedNewsData"></p>

        </div>
      </div>
    </div>
  </template>
  

  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    data() {
      return {
        loading: false,
        newsData: null,
        perplexityAnswered: null,
      }
    },
    computed: {
      ...mapGetters([
        'getNews'
      ]),
      formattedNewsData() {
        let formattedData = this.newsData;

        // Replace **text** with <strong>text</strong>
        formattedData = formattedData.replace(/\*\*(.*?)\*\*/g, '<br><br><strong>$1</strong>');

        this.$store.commit('setAnswerPerplexityFormated', formattedData)


        return formattedData;
        },
    },
    methods: {
      async fetchNews() {
        this.loading = true;
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer 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'
          },
          body: JSON.stringify({
            model: 'llama-3-sonar-small-32k-online',
            messages: [
              {role: 'system', content: 'Give 5 more related news, give precise and detailed information with sources'},
              {role: 'user', content: this.getNews}
            ]
          })
        };

        try {
          const response = await fetch('https://api.perplexity.ai/chat/completions', options)
          const data = await response.json()
          this.newsData = data.choices[0].message.content
          console.log(data)
          this.loading = false;
          this.perplexityAnswered = true;
          this.$store.commit('setAnswerPerplexity', this.newsData)
          this.$store.commit('setPerplexityAnswered', true)
        } catch (error) {
          console.error(error)
          this.loading = false;
        }
      }
    },
    created() {
      console.log(this.getNews)
    }
  }
  </script>