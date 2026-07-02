import { Package } from "lucide-react";

const SAFE_COLOURS = [
  "white",
  "black",
  "red",
  "green",
  "blue",
  "yellow",
  "pink",
  "brown",
  "orange",
  "purple",
  "grey",
  "gray",
];

function resolveColour(colour) {
  if (!colour) return null;
  const normalized = colour.trim().toLowerCase();
  if (normalized === "voilet") return "violet";
  if (SAFE_COLOURS.includes(normalized)) return normalized;
  if (CSS?.supports?.("color", normalized)) return normalized;
  return null;
}

function ProductImage({ colour, size = "card" }) {
  const resolved = resolveColour(colour);
  const heightClass = size === "card" ? "" : "";
  const style =
    size === "card"
      ? { height: "110px", width: "100%" }
      : { height: "32px", width: "32px" };

  if (!resolved) {
    return (
      <div
        className="rounded d-flex align-items-center justify-content-center"
        style={{
          ...style,
          backgroundImage:
            "repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 10px, #e2e8f0 10px, #e2e8f0 20px)",
        }}
      >
        <Package
          size={size === "card" ? 28 : 14}
          strokeWidth={1.75}
          className="text-secondary"
        />
      </div>
    );
  }

  return (
    <div
      className={size === "card" ? "rounded-3" : "rounded-2"}
      style={{ ...style, backgroundColor: resolved }}
    />
  );
}

export default ProductImage;