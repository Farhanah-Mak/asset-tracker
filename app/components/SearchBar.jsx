
import { useState } from "react";
      export default function SearchBar({ onSearch }) {
        const [searchTerm, setSearchTerm] = useState("");

        const handleInputChange = (e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value); // Send the search term to the parent
        };

        return (
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search by Employee ID"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        );
      }
