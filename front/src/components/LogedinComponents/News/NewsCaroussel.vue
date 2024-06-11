<template>
    <div class="bg-white py-2 sm:py-1">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center">
            <div>
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ask Questions!</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">Here are some exemples of last news</p>
            </div>
        </div>
        <div class="scrolling-wrapper" ref="scrollContainer">
          <article v-for="post in posts" :key="post.id" class="scrolling-card">
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.publishedAt" class="text-gray-500">{{ post.publishedAt }}</time>
              <a :href="post.url" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.source.name }}</a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-m font-semibold leading-6 text-gray-900 group-hover:text-gray-600">{{ post.title }}</h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img :src="post.urlToImage" loading="lazy" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
              <div class="text-sm leading-6 overflow-hidden">
                <p class="text-gray-600">{{ post.author }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [],
        searchQuery: 'bbc',
      };
    },
    mounted() {
      this.startAutoScroll();
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
      setNews(description) {
        this.$store.commit('setNews', description);
      },
      startAutoScroll() {
        const container = this.$refs.scrollContainer;
        setInterval(() => {
          if (container.scrollLeft < container.scrollWidth - container.clientWidth) {
            container.scrollLeft += 1;
          } else {
            container.scrollLeft = 0;
          }
        }, 50); // Adjust speed as needed
      },
    },
    created() {
      this.fetchNews();
    },
  };
  </script>
  
  <style scoped>
  .scrolling-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  
  .scrolling-card {
    display: inline-block;
    margin-right: 10px;
    width: 400px; /* Adjust as needed */
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    vertical-align: top;
  }
  
  .scrolling-card p {
    word-wrap: break-word; /* Ensure long words break and wrap within the card */
    white-space: normal; /* Allow text to wrap to the next line */
  }
  .scrolling-card h3 {
    word-wrap: break-word; /* Ensure long words break and wrap within the card */
    white-space: normal; /* Allow text to wrap to the next line */
  }
  </style>
  