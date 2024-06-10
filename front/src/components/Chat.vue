<template>
  <div class="chat-container">
    <div class="flex items-center mb-4">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Ask an expert in</h2>
      <div class="flex items-center ml-3">
        <input v-model="searchQuery" class="border border-gray-300 rounded-lg p-1 text-sm mr-2" type="text" placeholder="Type here ...">
        <button @click="fetchRole" class="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Set Role</button>
        <div v-if="popupVisible" class="popup">Role Set!</div>
      </div>
    </div>

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
    <div class="flex items-center mt-4">
      <input v-model="inputMessage" @keyup.enter="sendMessage" class="border border-gray-300 rounded-lg p-1 text-sm w-full mr-2" placeholder="Type a message..." />
      
      <button @click="sendMessage" class="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Send</button>
    </div>
  </div>
</template>

<script>
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default {
  data() {
    return {
      searchQuery: '',
      userRole: '',
      messages: [],
      inputMessage: '',
      popupVisible: false,
    };
  },
  methods: {
    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleTimeString();
    },
    fetchRole() {
      this.userRole = this.searchQuery;
      console.log('User role:', this.userRole);
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
      }, 1500);
    },
    async sendMessage() {
      if (!this.inputMessage.trim()) return;

      const userMessage = {
        user: true,
        text: this.inputMessage,
        time: new Date().toISOString()
      };
      this.messages.push(userMessage);

      if (!this.userRole) {
        const botMessage = {
          user: false,
          text: "You didn't assign me a role yet.",
          time: new Date().toISOString()
        };
        this.messages.push(botMessage);
      } else {
        try {
          const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: `You are a specialist in ${this.userRole}.` }, 
              { role: 'user', content: this.inputMessage }
            ],
          });

          const botReply = response.choices[0].message.content.trim();
          const botMessage = {
            user: false,
            text: botReply,
            time: new Date().toISOString()
          };
          this.messages.push(botMessage);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }

      this.inputMessage = '';
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
  padding: 10px;
}
button {
  padding: 10px;
}
.popup {
    transition: opacity 0.5s;
    opacity: 0;
    margin-left: 5px;
  }
  
  .popup {
    opacity: 1;
  }

</style>




