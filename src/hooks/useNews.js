import axios from 'axios';
import {ref, onMounted} from 'vue';

export function useNews(state) {
    const news = ref([])
    const categoryId = ref(this.$store.state.categoryId)

    const fetchNews = async () => {
        try {
            const response = await axios.get(`https://magnum.kz:${state.port}/api/news?sort[0]=publishedAt%3Adesc&populate[news_category]=%2A&populate[shops]=%2A&populate[image]=%2A&populate[localizations]=%2A&populate[cities]=%2A&filters[cities][id][$in]=2&locale=ru`)
            state.categoryId == 0 ? state.news = response.data.data : state.news = response.data.data.filter(newsItem => newsItem.attributes.news_category.data.id == state.categoryId)
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(fetchNews)

    return { news, categoryId }
}