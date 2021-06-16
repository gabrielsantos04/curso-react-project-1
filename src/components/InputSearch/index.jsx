import "./styles.css";

export const InputSearch = ({ searchValue, handleChange }) => {
  return (
    <input
      className="search-input"
      type="search"
      onChange={handleChange}
      value={searchValue}
    />
  );
};
