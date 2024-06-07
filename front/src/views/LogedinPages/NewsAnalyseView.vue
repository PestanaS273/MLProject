<script setup>
import TopHeader from '@/components/TopHeader.vue';
import AIPerplexity from '@/components/LogedinComponents/AI/AIPerplexity.vue';

</script>

<template>
    <div class="flex flex-col">
        <TopHeader class="order-1 "/>

        <AIPerplexity class="order-2"/>

        
    </div>

</template>

<style scoped>
.header {
    margin-bottom: 20px; 

}

.chat {
    margin-top: 20px; 
}
</style>
