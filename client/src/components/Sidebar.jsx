import React, { useState } from 'react';
import '../styles/Sidebar.css';

function Sidebar({ onCategoryChange }) {
    // State to manage the currently active category
    const [activeCategory, setActiveCategory] = useState('Latest');
    // State to manage the list of categories, initialized with a default set
    const [categories, setCategories] = useState([
        'Latest',
        'Local',
        'Weather',
        'Traffic',
        'Youfe'
    ]);
    // State to manage the value of the new category input field
    const [newCategory, setNewCategory] = useState('');

    // Handles a menu item click. It updates the active category and calls the parent's handler.
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    // Handles the addition of a new category to the list
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory(''); // Clear the input field after adding
        }
    };

    return (
        <aside className="sidebar">
            <div className="search-bar">
                <input type="text" placeholder="Search" />
            </div>
            
            <ul className="sidebar-menu">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`menu-item ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            <div className="add-category-section">
                <input
                    type="text"
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add</button>
            </div>
        </aside>
    );
}

export default Sidebar;