import { useState } from "react";
import { updateArticlesVotes } from "../../utils/api";

const Votes = (params) => {
  const { vote, article_id, onVoteChange } = params;
  const [error, setError] = useState(false);

  const giveVote = (inc_votes) => {
    const newVoteTotal = vote + inc_votes;

    if (newVoteTotal < 0) return;

    onVoteChange(inc_votes);
    setError(false);

    updateArticlesVotes(article_id, inc_votes).catch(() => {
      onVoteChange(-inc_votes);
      setError(true);
    });
  };

  return (
    <div>
      <button onClick={() => giveVote(-1)} disabled={vote <= 0}>
        👎 Downvote
      </button>
      <button onClick={() => giveVote(1)}>👍 Upvote</button>
      <p>Votes: {vote}</p>
      {error && (
        <p className="error">Failed to update vote. Please try again.</p>
      )}
    </div>
  );
};

export default Votes;
