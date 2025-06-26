import { nanoid } from 'nanoid';

export const isUrlExpired = async (expiryDate: Date | null) => {
  if (!expiryDate) {
    return false;
  }

  return expiryDate && expiryDate < new Date();
};

export const generateShortCode = (): string => {
  return nanoid(6);
};

export const sanitizeUrlInput = (url: string): string => {
  return url.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export const validateUrl = (url: string): { isValid: boolean; errorMessage?: string } => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, errorMessage: 'URL is required' };
  }

  if (url.length > 2048) {
    return { isValid: false, errorMessage: 'URL is too long' };
  }

  try {
    const urlObj = new URL(url);
    const allowedProtocols = ['http:', 'https:'];

    if (!allowedProtocols.includes(urlObj.protocol)) {
      return { isValid: false, errorMessage: 'Only HTTP and HTTPS URLs are allowed' };
    }

    // Check for suspicious protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:', 'chrome:'];
    if (dangerousProtocols.some((protocol) => url.toLowerCase().startsWith(protocol))) {
      return { isValid: false, errorMessage: 'Dangerous URL type detected' };
    }

    // Check for localhost/internal IPs (optional)
    const hostname = urlObj.hostname.toLowerCase();
    if (hostname === 'localhost' || hostname.startsWith('127.') || hostname.startsWith('192.168.')) {
      return { isValid: false, errorMessage: 'Local URLs are not allowed' };
    }
  } catch (error) {
    console.error(error);
    return { isValid: false, errorMessage: 'Invalid URL format' };
  }

  return { isValid: true };
};
