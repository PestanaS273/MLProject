import axios from 'axios';

const API_KEY = 'sk-proj-u4y8FVGiGhiV4qcC7FaXT3BlbkFJzXWzrv7gOYq2G7WPbQkF'; 

const openaiService = {
  async sendMessage(message) {
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    };
    const data = {
      prompt: message,
      max_tokens: 150,
      temperature: 0.7
    };

    try {
      const response = await axios.post(endpoint, data, { headers });
      return response.data.choices[0].text;
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      throw error;
    }
  }
};

export default openaiService;
