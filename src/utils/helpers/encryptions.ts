const encryptedPrefix = "encrypted-";

// Helper function to convert string to ArrayBuffer
const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// Helper function to convert ArrayBuffer to string
const arrayBufferToString = (buffer: ArrayBuffer): string => {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
};

// Generate an AES key (256-bit key) and store it in IndexedDB or localStorage for real-world use
const getAESKey = async (): Promise<CryptoKey> => {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 }, // AES-GCM mode with a 256-bit key
    true, // extractable (can export the key for reuse)
    ["encrypt", "decrypt"] // usage
  );
  return key;
};

// Encrypt the value
export const encryptValue = async (value: string): Promise<string> => {
  const key = await getAESKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector for AES-GCM
  const encodedValue = stringToArrayBuffer(value);

  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, // AES-GCM mode with IV
    key,
    encodedValue // ArrayBuffer of the value
  );

  // Combine IV and encrypted data (both ArrayBuffers) into a single string for storage
  const ivString = arrayBufferToString(iv);
  const encryptedString = arrayBufferToString(encryptedData);

  // Combine the IV and encrypted data into one string, with a custom prefix
  return `${encryptedPrefix}${ivString}:${encryptedString}`;
};

// Decrypt the value
export const decryptValue = async (value: string): Promise<string> => {
  // Strip the prefix and extract IV and encrypted data
  const encryptedData = value.replace(encryptedPrefix, "");
  const [ivString, encryptedString] = encryptedData.split(":");

  const key = await getAESKey();
  const iv = stringToArrayBuffer(ivString);
  const encryptedArrayBuffer = stringToArrayBuffer(encryptedString);

  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedArrayBuffer
  );

  // Return decrypted string
  return arrayBufferToString(decryptedData);
};
