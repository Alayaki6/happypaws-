import { Link } from "react-router-dom";

function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <Link to={`/pets/${pet.id}`} className="pet-card-image">
        <img
          src={pet.image}
          alt={pet.name}
        />
      </Link>

      <div className="pet-card-content">
        <p className="pet-card-category">{pet.category}</p>

        <h3>{pet.name}</h3>

        <p className="pet-card-breed">{pet.breed}</p>

        <div className="pet-card-info">
          <span>{pet.age}</span>
          <span>{pet.gender}</span>
        </div>

        <div className="pet-card-footer">
          <strong>{pet.price}</strong>

          <Link to={`/pets/${pet.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
