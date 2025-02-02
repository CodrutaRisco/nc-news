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

export const getArticleComments = (article_id) => {
  console.log(`Fetching comments for article ID: ${article_id}`);
  return newApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const updateCommentsVotes = (comments_id, inc_votes) => {
  return newApi
    .patch(`/comments/${comments_id}`, { inc_votes })
    .then(({ data }) => {
      return data.comments;
    });
};

export const updateArticlesVotes = (article_id, inc_votes) => {
  return newApi
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => {
      return data.article;
    });
};
export const postComment = (article_id, body) => {
  return newApi
    .post(`/articles/${article_id}/comments`, body)
    .then(({ data }) => {
      console.log("data comment", data);
      return data;
    });
};