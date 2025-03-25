import axios from 'axios'

const ArticleServices = {
    async getArticles() {
        const response = await axios.get('/articles')
        return response.data
    },
    async getArticle(slug) {
        const response = await axios.get(`/articles/${slug}`)
        return response.data
    },
    async postArticle(article) {
		const {data} = await axios.post('/articles', {article})
		return data
	},
    async deleteArticle(slug) {
        const response = await axios.delete(`/articles/${slug}`)
        return response.data
    },
    async editArticle(slug, article) {
		const {data} = await axios.put(`/articles/${slug}`, {article})
		return data
	},
}

export default ArticleServices