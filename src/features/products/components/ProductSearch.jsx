import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../../../shared/hooks/useDebounce";

function ProductSearch({ onSearch, placeholder = "Search products…" }) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <div className="position-relative" style={{ maxWidth: "320px" }}>
      <Search
        size={16}
        strokeWidth={1.75}
        className="position-absolute top-50 translate-middle-y text-secondary"
        style={{ left: "12px" }}
      />
      <input
        type="text"
        className="form-control ps-5"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default ProductSearch;