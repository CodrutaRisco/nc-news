import { updateArticlesVotes } from "../../utils/api";
import "./votes.css";

const Votes = (params) => {
  const { vote, article_id, onVoteChange } = params;

  const giveVote = (inc_votes) => {
    const newVoteTotal = vote + inc_votes;

    if (newVoteTotal < 0) return;

    onVoteChange(inc_votes);

    updateArticlesVotes(article_id, inc_votes).catch(() => {
      onVoteChange(-inc_votes);
    });
  };

  return (
    <div className="votes">
      <p>Votes: {vote}</p>
      <button className="vote-button" onClick={() => giveVote(1)}>
        👍
      </button>
      <button className="vote-button" onClick={() => giveVote(-1)}>
        👎
      </button>
    </div>
  );
};

export default Votes;
