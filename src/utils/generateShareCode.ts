export function generateShareCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // Exemplo: "A1B2C3"
}
