import { useMemo } from "react";

function ProductFilter({ products, brand, colour, onBrandChange, onColourChange }) {
  const brands = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((product) => product.brand))).sort();
  }, [products]);

  const colours = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((product) => product.colour))).sort();
  }, [products]);

  return (
    <div className="d-flex flex-wrap gap-2">
      <select
        className="form-select"
        style={{ maxWidth: "180px" }}
        value={brand}
        onChange={(event) => onBrandChange(event.target.value)}
      >
        <option value="">All brands</option>
        {brands.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        style={{ maxWidth: "180px" }}
        value={colour}
        onChange={(event) => onColourChange(event.target.value)}
      >
        <option value="">All colours</option>
        {colours.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilter;