import { Form, InputGroup, Button } from "react-bootstrap";
import { Search, X } from "lucide-react";

function SearchBar({value,onChange,placeholder = "Search...",disabled = false}) {
  return (
    <InputGroup
      className="shadow-sm rounded"
      style={{
        maxWidth: "400px",
      }}
    >
  
      <InputGroup.Text>
        <Search size={18} />
      </InputGroup.Text>

      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <Button variant="outline-secondary" onClick={() => onChange("")}>
          <X size={18} />
        </Button>
      )}
    </InputGroup>
  );
}

export default SearchBar;
