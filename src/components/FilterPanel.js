import React from "react";

const FilterPanel = ({filters, updateFilter, sortOption, updateSortOption, reset}) => {
    return (
        <div className="filter-panel">

            <div className="sort-options">
                <label>Sort By:</label>
                <select value={sortOption} onChange={updateSortOption}>
                    <option value="">Select</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="rating">Rating</option>
                </select>
            </div>

            <hr/>
            <br/>

            <h3>Filters</h3>

            <div>
                <label>Category:</label>
                <select value={filters.category} onChange={e => updateFilter("category", e.target.value)}>
                    <option value="">All</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>

            <div>
                <label>Brand:</label>
                <select value={filters.brand} onChange={e => updateFilter("brand", e.target.value)}>
                    <option value="">All</option>
                    <option value="Brand A">Brand A</option>
                    <option value="Brand B">Brand B</option>
                    <option value="Brand C">Brand C</option>
                    <option value="Brand D">Brand D</option>
                    <option value="Brand E">Brand E</option>
                </select>
            </div>

            <div>
                <label>Price Range:</label>
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={e => updateFilter("priceRange", [0, Number(e.target.value)])}
                />
                <span>Up to ${filters.priceRange[1]}</span>
            </div>

            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.rating}
                    onChange={e => updateFilter("rating", Number(e.target.value))}
                />
            </div>

            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default FilterPanel;
