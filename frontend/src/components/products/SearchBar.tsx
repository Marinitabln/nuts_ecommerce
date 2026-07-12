"use client";

import { Search, X } from "lucide-react";
import Container from "../ui/Container";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Container>
      <div className="relative w-full max-w-md mx-auto mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Buscar producto..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 outline-none focus:border-primary"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </Container>
  );
};

export default SearchBar;
