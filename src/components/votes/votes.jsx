import { useState } from "react";
import { updateArticlesVotes } from "../../utils/api";

const Votes = (params) => {
  const { vote = 0, article_id } = params;
  const [voteChange, setVoteChange] = useState(0);
  const [error, setError] = useState(false);

  const giveVote = (inc_votes) => {
    const newVoteTotal = vote + voteChange + inc_votes;

    if (newVoteTotal < 0) return;

    setVoteChange((currChange) => currChange + inc_votes);
    setError(false);

    updateArticlesVotes(article_id, inc_votes).catch(() => {
      setVoteChange((currChange) => currChange - inc_votes);
      setError(true);
    });
  };

  return (
    <div>
      <button onClick={() => giveVote(1)}>👍 Upvote</button>
      <button onClick={() => giveVote(-1)} disabled={vote + voteChange <= 0}>
        👎 Downvote
      </button>
      <p>Votes: {vote + voteChange}</p>
      {error && (
        <p className="error">Failed to update vote. Please try again.</p>
      )}
    </div>
  );
};

export default Votes;
