import { useState, useEffect, useRef, useCallback, useContext } from "react";
import API from "../utils/api";
import PlantCard from "../components/Plants/PlantCard";
import SearchInput from "../components/Search/SearchInput";
import DropdownFilter from "../components/Plants/DropdownFilter";
import useDebounce from "../hooks/useDebounce";
import AddPlantModal from "../components/Modals/AddPlantModal";
import EditPlantModal from "../components/Modals/EditPlantModal";
import { AuthContext } from "../context/AuthContext"; // ✅ use context

export default function Home() {
  const { role, isAuthenticated } = useContext(AuthContext); // ✅ use context
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalPlant, setEditModalPlant] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const observer = useRef();

  // Infinite scroll observer
  const lastPlantRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch categories once
  useEffect(() => {
    API.get("/plants")
      .then((res) => {
        const allCategories = Array.from(
          new Set(res.data.plants?.flatMap((p) => p.categories) || [])
        );
        setCategories(allCategories);
      })
      .catch(console.error);
  }, []);

  // Fetch plants with search + filter + pagination
  useEffect(() => {
    if (!isAuthenticated) return; // ✅ stop if user is not logged in
    setLoading(true);

    API.get("/plants", {
      params: { name: debouncedSearchTerm, category: categoryFilter, page, limit: 6 },
    })
      .then((res) => {
        if (page === 1) {
          setPlants(res.data.plants);
        } else {
          setPlants((prev) => [...prev, ...res.data.plants]);
        }
        setHasMore(page < res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [debouncedSearchTerm, categoryFilter, page, refreshFlag, isAuthenticated]);

  // Reset plants & page when search/filter changes
  useEffect(() => {
    setPage(1);
    setPlants([]);
  }, [debouncedSearchTerm, categoryFilter, refreshFlag]);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px", color: "#166534" }}>
        🌱 Our Plants
      </h1>

      {/* Admin Add Plant Button */}
      {role === "admin" && (
        <div style={{ marginBottom: "16px" }}>
          <button
            onClick={() => setAddModalOpen(true)}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Plant
          </button>
        </div>
      )}

      {/* Add/Edit Modals */}
      {addModalOpen && <AddPlantModal onClose={() => setAddModalOpen(false)} onAdd={() => setRefreshFlag(!refreshFlag)} />}
      {editModalPlant && <EditPlantModal plant={editModalPlant} onClose={() => setEditModalPlant(null)} onUpdate={() => setRefreshFlag(!refreshFlag)} />}

      {/* Search + Filter */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search plants by name..." />
        <DropdownFilter value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} options={categories} />
      </div>

      {/* Plants Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px" }}>
        {plants.map((plant, i) =>
          i === plants.length - 1 ? (
            <div key={plant._id} ref={lastPlantRef} onClick={() => role === "admin" && setEditModalPlant(plant)} style={{ cursor: role === "admin" ? "pointer" : "default" }}>
              <PlantCard plant={plant} />
            </div>
          ) : (
            <div key={plant._id} onClick={() => role === "admin" && setEditModalPlant(plant)} style={{ cursor: role === "admin" ? "pointer" : "default" }}>
              <PlantCard plant={plant} />
            </div>
          )
        )}
      </div>

      {loading && (
  <div style={loaderContainerStyle}>
    <div style={loaderStyle}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)}

    </div>
  );
}

const loaderContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "16px",
};

const loaderStyle = {
  border: "6px solid #f3f3f3",
  borderTop: "6px solid #2e7d32",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: "spin 1s linear infinite",
};
