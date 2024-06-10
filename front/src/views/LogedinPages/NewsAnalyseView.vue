<script setup>
import { ref } from 'vue';


import TopHeader from '@/components/TopHeader.vue';
import AIPerplexity from '@/components/LogedinComponents/AI/AIPerplexity.vue';
import AnalyseImpacts from '@/components/LogedinComponents/AI/AnalyseImpacts.vue';
import CreateArticle from '@/components/LogedinComponents/AI/CreateArticle.vue';
import SummarizeInfo from '@/components/LogedinComponents/AI/SummarizeInfo.vue';




const slides = ref([]);


const addSlide = (slide) => {
  slides.value.push(slide);
};

</script>

<template>
    <div class="flex flex-col">
        <TopHeader class="order-1 "/>

        

        <AIPerplexity class="order-2"/>


        <div v-if="perplexityAnswered" class="order-3 flex justify-center mt-3 my-4 mx-4 ">
            <AnalyseImpacts @assistant-created="addSlide" />
            <CreateArticle @assistant-created="addSlide" />
            <SummarizeInfo @assistant-created="addSlide" />
        </div>


        <div class="order-4 my-5" v-if="slides.length > 0">
            <swiper 
            :slidesPerView="'auto'"
            :centeredSlides="true"
            :navigation="true" 
            :spaceBetween="30"
            :modules="modules" 
            class="mySwiper">
                <swiper-slide v-for="(slide, index) in slides">  
                    <div class="w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chat GPT : {{ slide.title }}</h5>
                        <p class="mb-3 my-5 font-normal text-gray-700 dark:text-gray-400" v-html="slide.content"></p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        
        


        <div >
            
        </div>
        
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            perplexityAnswered: false,
            slides: [],
        }
    },
    setup() {
      return {
        modules: [Navigation],
      };
    },

    watch: {
        getPerplexityAnswered(newVal) {
            this.perplexityAnswered = newVal;
        },

    },
    

    computed: {
        ...mapGetters([
            'getPerplexityAnswered',
            'getAnswerPerplexityFormated'
        ]),

        
    },

}
</script>

<style scoped>
.header {
    margin-bottom: 20px; 

}

.chat {
    margin-top: 20px; 
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>

