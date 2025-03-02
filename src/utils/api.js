import axios from "axios";

const newApi = axios.create({
  baseURL: "https://my-nc-news-pemi.onrender.com/api",
});


export const getArticles = (
  topic = "slug",
  sort_by = "comment_count",
  order = "DESC"
) => {
  return newApi
    .get("/articles", {
      params: { topic, sort_by, order },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => console.error("API error:", err));
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
    return data.topic;
  });
};

export const postComment = (article_id, body) => {
  return newApi.post(`/articles/${article_id}/comments`, body).then((data) => {
    console.log("datacomment---->>>", data.comment.comment);
    return data.comment;
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