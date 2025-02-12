// eslint-disable-next-line react/prop-types
export const SearchByTopic = ({ setSearchParams }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const topic = e.target.topic.value.trim();
    if (!topic) return;
    console.log("Setting topic:", topic); // Debugging
    //    {
    //   setSearchParams({ topic, sort_by: "created_at", order_by: "DESC" }); // Ensure parameters are reset
    // }

    // if (!setSearchParams) {
    //   console.error("setSearchParams is undefined");
    //   return;
    // }

    setSearchParams({ topic });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="topic" placeholder="Search by topic" />
        <button type="submit">Search</button>
      </form>
    </>
  );
};
