import PetCard from "./PetCard";

function PetGrid({ pets = [] }) {
  if (pets.length === 0) {
    return (
      <div className="pet-grid-empty">
        <p>No pets found.</p>
      </div>
    );
  }

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}

export default PetGrid;
