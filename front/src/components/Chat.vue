<!-- src/components/Chat.vue -->
<template>
    <div class="chat-container">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" :class="{'user-message': message.user, 'bot-message': !message.user}">
          {{ message.text }}
        </div>
      </div>
      <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message..."/>
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  import openaiService from '@/views/LogedinPages/openaiService';
  
  export default {
    data() {
      return {
        inputMessage: '',
        messages: []
      };
    },
    methods: {
      async sendMessage() {
        if (!this.inputMessage) return;
        
        const userMessage = this.inputMessage;
        this.messages.push({ text: userMessage, user: true });
        this.inputMessage = '';
  
        try {
          const botResponse = await openaiService.sendMessage(userMessage);
          this.messages.push({ text: botResponse, user: false });
        } catch (error) {
          this.messages.push({ text: 'Error communicating with the API.', user: false });
        }
      }
    }
  };
  </script>
  
  <style>
  .chat-container {
    max-width: 600px;
    margin: 0 auto;
  }
  .messages {
    border: 1px solid #ccc;
    padding: 10px;
    height: 300px;
    overflow-y: scroll;
  }
  .user-message {
    text-align: right;
  }
  .bot-message {
    text-align: left;
  }
  input {
    width: 80%;
    padding: 10px;
  }
  button {
    padding: 10px;
  }
  </style>
  