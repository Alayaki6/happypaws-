import PetGrid from "../components/PetGrid";
import pets from "../data/pets";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO HAPPYPAWS</p>

          <h1>Find Your Perfect Companion</h1>

          <p>
            Discover dogs, cats, rabbits, birds, and other pets
            looking for the right home.
          </p>

          <div className="hero-search">
            <input
              type="search"
              placeholder="Search for a pet, breed, or animal..."
              aria-label="Search for a pet, breed, or animal"
            />

            <button type="button">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Find Your New Companion</h2>
        </div>

        <div className="category-grid">
          <a href="/dogs">🐶 Dogs</a>
          <a href="/cats">🐱 Cats</a>
          <a href="/other-pets">🐰 Other Pets</a>
        </div>
      </section>

      <section className="featured-pets">
        <div className="section-heading">
          <p>HAPPYPAWS COLLECTION</p>
          <h2>Featured Pets</h2>
        </div>

        <PetGrid pets={pets} />
      </section>
    </main>
  );
}

export default Home;
