const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export async function getPets(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const query = searchParams.toString();

  const response = await fetch(
    `${API_BASE_URL}/pets/${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pets.");
  }

  return response.json();
}

export async function getPetById(petId) {
  const response = await fetch(`${API_BASE_URL}/pets/${petId}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch pet.");
  }

  return response.json();
}
