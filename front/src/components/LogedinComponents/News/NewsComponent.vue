<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Look for some News!</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Click on a News To Analyse It with AI!</p>
        </div>
        <div class="flex items-center">
          <input v-model="searchQuery" class="border border-gray-300 rounded-lg p-2 mr-2" type="text" placeholder="Search news...">
          <button @click="fetchNews" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Search</button>
        </div>
      </div>
      <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
        
        <article v-for="post in displayedPosts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between border border-gray-200 rounded-lg p-4 shadow-sm overflow-hidden	">
          <RouterLink to="/newsanalyse" @click="setNews(post.description)">
            <div class="flex items-center gap-x-4 text-xs ">
              <time :datetime="post.publishedAt" class="text-gray-500">{{ post.publishedAt }}</time>
              <a :href="post.url" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.source.name }}</a>
            </div>
            <div class="group relative ">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">{{ post.title }}</h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4 ">
              <img :src="post.urlToImage" loading="lazy" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
              <div class="text-sm leading-6 overflow-hidden	">
                <p class="text-gray-600 ">{{ post.author }}</p>
              </div>
            </div>
          </RouterLink>
        </article>
      </div>
      <button @click="loadMore" class="mx-auto mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Load More</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      postsToDisplay: 20,
      searchQuery: 'bitcoin',
    };
  },
  computed: {
    displayedPosts() {
      return this.posts.slice(0, this.postsToDisplay);
    },
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${this.searchQuery}&sources:'bbc-news'&sortBy=popularity&apiKey=fd7f7721de6249198d8a9fa730eb6447`)
        const data = await response.json()
        this.posts = data.articles.filter(post => post.author !== null)

        console.log(this.posts)
      } catch (error) {
        console.error(error)
      }
    },
    loadMore() {
      this.postsToDisplay += 20;
    },
    setNews(description) {
      this.$store.commit('setNews', description);
    },
  },
  created() {
    this.fetchNews();
  },
};
</script>

<style scoped>

</style>