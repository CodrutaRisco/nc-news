import axios from "axios";

const newApi = axios.create({
  baseURL: "https://my-nc-news-pemi.onrender.com/api",
});

export const getArticles = (articles_types) => {
  return newApi
    .get("/articles", {
      params: {
        type: articles_types,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (article_id) => {
  return newApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
