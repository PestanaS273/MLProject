<template>
    <div class="chat-container" >
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" :class="{'user-message': message.user, 'bot-message': !message.user}">
          <div class="flex items-start gap-2.5" :style="{ flexDirection: message.user ? 'row-reverse' : 'row' }">
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.user ? 'User' : 'Bot' }}</span>
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ formatTime(message.time) }}</span>
              </div>
              <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ message.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  
  import axios from 'axios';
  import'dotenv/config';
  import OpenAI from 'openai';

  const apiKey = process.env.OPENAI_API_KEY;

  
  const openai = newOpenAI({
  apiKey: apiKey,

  });


  
  export default {
    data() {
      return {
        messages: [],
        inputMessage: '',
        API_KEY: 'sk-proj-LwLhAsIoDFVpjKfQCylaT3BlbkFJwqAoJHwS1BaD0pl7AdF7' 
      };
    },
    methods: {
      formatTime(date) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleTimeString([], options);
      },
      async sendMessage() {
        if (!this.inputMessage) return;
  
        const currentTime = new Date();
        this.messages.push({ user: true, text: this.inputMessage, time: currentTime });
        const userMessage = this.inputMessage;
        this.inputMessage = '';
  
        try {
          const botResponse = await this.callOpenAI(userMessage);
          this.messages.push({ user: false, text: botResponse, time: currentTime });
        } catch (error) {
          this.messages.push({ user: false, text: 'Error communicating with the API.', time: currentTime });
        }
      },
      async callOpenAI(message) {
        const endpoint = 'https://api.openai.com/v1/completions';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        };
        const data = {
          prompt: message,
          max_tokens: 150,
          temperature: 0.7,
          model: 'text-davinci-003' // Ensure you specify the correct model
        };
  
        try {
          const response = await axios.post(endpoint, data, { headers });
          return response.data.choices[0].text.trim();
        } catch (error) {
          console.error('Error sending message to OpenAI:', error);
          throw error;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 800px;
    margin-left: 270px;
    margin-top: 150px;
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
    background-color: rgb(234, 233, 233);
  }
  button:hover {
    background-color: lightgray;
  }
  </style>
  