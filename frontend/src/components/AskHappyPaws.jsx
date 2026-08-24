function AskHappyPaws({ pet }) {
  return (
    <section className="ask-happypaws">
      <div className="ask-happypaws-header">
        <span>🤖</span>

        <div>
          <h2>Ask HappyPaws AI</h2>
          <p>
            Have a question about {pet?.name || "this pet"}?
            Ask HappyPaws.
          </p>
        </div>
      </div>

      <form className="ask-happypaws-form">
        <label htmlFor="pet-question">
          Your question
        </label>

        <textarea
          id="pet-question"
          name="question"
          placeholder="Ask something about this pet..."
          rows="4"
        />

        <button type="submit">
          Ask HappyPaws AI
        </button>
      </form>

      <div className="ai-response" aria-live="polite">
        <p>
          AI responses will appear here.
        </p>
      </div>
    </section>
  );
}

export default AskHappyPaws;
