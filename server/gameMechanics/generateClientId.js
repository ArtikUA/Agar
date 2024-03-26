/**
 * Generates a unique client ID.
 * @returns {string} Unique client ID.
 */
function generateClientId() {
  try {
    const clientId = `client-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`Generated client ID: ${clientId}`);
    return clientId;
  } catch (error) {
    console.error('Error generating client ID:', error.message, error.stack);
    throw error; // Rethrow the error after logging
  }
}

module.exports = { generateClientId };