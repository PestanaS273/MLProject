<script setup>
import TopHeader from '@/components/TopHeader.vue';
//import AIButtons from '@/components/LogedinComponents/AI/AIButtons.vue';
import Chat from '@/components/Chat.vue';
</script>

<template>

    <TopHeader/>

    <Chat/>


</template>

<style scoped>
.header {
    margin-bottom: 20px; 

}

.chat {
    margin-top: 20px; 
}
</style>
