import axios from './api'

const ArticleServices = {
  async getArticles() {
    const response = await axios.get('/posts/');
    return response.data;
  },

  async getArticle(id) {
    const response = await axios.get(`/posts/${id}/`);
    return response.data;
  },

  async postArticle(article) {
    const response = await axios.post('/posts/', article); 
    return response.data;
  },

  async deleteArticle(id) {
    const response = await axios.delete(`/posts/${id}/`);
    return response.data;
  },

  async editArticle(id, article) {
    const response = await axios.put(`/posts/${id}/`, article); 
    return response.data;
  },

  likeArticle: async (id) => await axios.post(`/posts/${id}/like/`),
  add_view: async (id) => await axios.post(`/posts/${id}/view/`),
};

export default ArticleServices;
