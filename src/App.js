import React, {useEffect, useState} from "react";
import products from "./data";
import ProductList from "./components/ProductList";
import FilterPanel from "./components/FilterPanel";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles.css";

function App() {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({category: "", brand: "", priceRange: [0, 500], rating: 0});
    const [loading, setLoading] = useState(false);
    const [sortOption, setSortOption] = useState(localStorage.getItem("sortOption") || ""); // Initial sort state from local storage

    useEffect(() => {
        // Load filters from local storage on initial load
        const savedFilters = JSON.parse(localStorage.getItem("filters"));
        if (!!savedFilters.category || !!savedFilters.brand || !!savedFilters.rating || savedFilters.priceRange[1] !== 500)
            setFilters(savedFilters);
    }, []);

    useEffect(() => {
        const applyFiltersAndSorting = () => {
            setLoading(true);
            let updatedProducts = products;

            // Apply filters
            if (filters.category) updatedProducts = updatedProducts.filter(p => p.category === filters.category);
            if (filters.brand) updatedProducts = updatedProducts.filter(p => p.brand === filters.brand);
            if (filters.priceRange) updatedProducts = updatedProducts.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
            if (filters.rating) updatedProducts = updatedProducts.filter(p => p.rating >= filters.rating);

            // Apply sorting
            if (sortOption === "priceLowToHigh") {
                updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
            } else if (sortOption === "priceHighToLow") {
                updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
            } else if (sortOption === "rating") {
                updatedProducts = updatedProducts.sort((a, b) => b.rating - a.rating);
            }

            setTimeout(() => {
                setFilteredProducts(updatedProducts);
                setLoading(false);
            }, 300); // debounce
        };

        applyFiltersAndSorting();

        // Save filters and sort option to local storage
        localStorage.setItem("filters", JSON.stringify(filters));
        localStorage.setItem("sortOption", sortOption);

    }, [filters, sortOption]);

    const updateFilter = (name, value) => {
        setFilters({...filters, [name]: value});
    };

    const reset = (name, value) => {
        setFilters({category: "", brand: "", priceRange: [0, 500], rating: 0});
        setSortOption("")
    };

    const updateSortOption = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="App">
            <FilterPanel filters={filters} sortOption={sortOption} updateFilter={updateFilter}
                         updateSortOption={updateSortOption} reset={reset}/>

            {loading ? <ClipLoader size={50}/> : <ProductList products={filteredProducts}/>}
        </div>
    );
}

export default App;
