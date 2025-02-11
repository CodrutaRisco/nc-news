import axios from "axios";

const newApi = axios.create({
  baseURL: "https://my-nc-news-pemi.onrender.com/api",
});

export const getArticles = (topic, sort_by, order_by) => {
  return newApi
    .get("/articles", {
      params: {
        type: { topic, sort_by, order_by },
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

export const updateCommentsVotes = async (comments_id, inc_votes) => {
  const { data } = await newApi.patch(`/comments/${comments_id}`, {
    inc_votes,
  });
  return data.comments;
};

export const updateArticlesVotes = (article_id, inc_votes) => {
  return newApi
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => {
      return data.article;
    });
};
export const getTopics = () => {
  return newApi.get(`/topics`).then((data) => {
    return data.topic;
  });
};
export const postComment = (article_id, body) => {
  return newApi
    .post(`/articles/${article_id}/comments`, body)
    .then(({ data }) => {
      console.log("data comment", data);
      return data.comments;
    });
};
export const getUsers = () => {
  return newApi.get("/users").then((response) => {
    return response.data;
  });
};