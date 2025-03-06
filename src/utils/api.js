import axios from "axios";

const newApi = axios.create({
  baseURL: "https://my-nc-news-pemi.onrender.com/api",
});

export const fetchArticles = (
  topic = "",
  sortBy = "created_at",
  order = "DESC"
) => {
  let url = `/articles?sort_by=${sortBy}&order=${order}`;

  if (topic) {
    url += `&topic=${topic}`;
  }

  return newApi.get(url).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newApi.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getArticleComments = (article_id) => {
  return newApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const updateCommentsVotes = (comments_id, inc_votes) => {
  return newApi
    .patch(`/comments/${comments_id}`, {
      inc_votes,
    })
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

export const getTopics = () => {
  return newApi.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
};

export const deleteCommentById = (comment_id) => {
  return newApi.delete(`/comments/${comment_id}`);
};

export const getUsers = () => {
  return newApi.get("/users").then((response) => {
    return response.data;
  });
};

export const postComment = (article_id, body) => {
  return newApi
    .post(`/articles/${article_id}/comments`, body)
    .then(({ data }) => {
      return data.comment;
    });
};

