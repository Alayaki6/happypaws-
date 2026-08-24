import { useParams } from "react-router-dom";
import AskHappyPaws from "../components/AskHappyPaws";

function PetDetails() {
  const { petId } = useParams();

  const pet = {
    id: petId,
    name: "Bella",
    category: "Dogs",
    breed: "Golden Retriever",
    age: "8 months",
    gender: "Female",
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    description:
      "Bella is a friendly and playful Golden Retriever looking for a loving home.",
    temperament: "Friendly, playful, and affectionate",
    availability: "Available",
  };

  return (
    <main className="pet-details-page">
      <section className="pet-details">
        <div className="pet-details-image">
          <img src={pet.image} alt={pet.name} />
        </div>

        <div className="pet-details-content">
          <p>{pet.category}</p>

          <h1>{pet.name}</h1>

          <h2>{pet.breed}</h2>

          <p>{pet.description}</p>

          <div className="pet-details-info">
            <p>
              <strong>Age:</strong> {pet.age}
            </p>

            <p>
              <strong>Gender:</strong> {pet.gender}
            </p>

            <p>
              <strong>Temperament:</strong> {pet.temperament}
            </p>

            <p>
              <strong>Availability:</strong> {pet.availability}
            </p>
          </div>

          <h3>{pet.price}</h3>

          <button type="button">
            Add to Cart
          </button>

          <button type="button">
            Contact / Inquiry
          </button>
        </div>
      </section>

      <AskHappyPaws pet={pet} />
    </main>
  );
}

export default PetDetails;
