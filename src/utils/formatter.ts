/**
 * Format a number with specified precision
 */
export function formatResult(value: number, precision: number = 2): string {
  // Handle precision 0 (no decimal places)
  if (precision === 0) {
    return Math.round(value).toString();
  }

  // Use toFixed to get exact decimal places, but handle trailing zeros
  const fixed = value.toFixed(precision);
  
  // Parse and re-string to remove trailing zeros (but keep at least one decimal if needed)
  const parsed = parseFloat(fixed);
  
  // If it's a whole number, return without decimals
  if (Number.isInteger(parsed) && precision > 0) {
    return parsed.toString();
  }

  // Otherwise return with the specified precision
  return parsed.toString();
}

/**
 * Format a result for verbose output
 */
export function formatVerboseOutput(
  value: number,
  toUnit: string,
  formula?: string
): string {
  const formatted = formatResult(value);
  let output = `${formatted} ${toUnit}`;
  
  if (formula) {
    output += `\nFormula: ${formula}`;
  }
  
  return output;
}
