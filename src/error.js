export class ValidationError extends Error {
  constructor(message, data = {}) {
    super(message)
    this.name = 'Menuy'
    this.prefix = `[${this.name}] Validation Error`
    this.data = data
  }
}