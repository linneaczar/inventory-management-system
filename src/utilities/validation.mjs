// Validerar att ett värde är en giltig sträng
// Kollar att värdet finns (inte undefined eller null) OCH att det är en string
export function validateString(value) {
   return (
    value !== undefined &&
    value !== null &&
    typeof value === "string" &&
    value.trim().length > 0
  );
}

// Validerar att ett värde är ett giltigt nummer
// Kollar att värdet finns, är ett nummer, och inte är NaN (Not a Number)
export function validateNumber(value) {
   if (value === undefined || value === null) return false;

  const num = Number(value);
  return !Number.isNaN(num);
}