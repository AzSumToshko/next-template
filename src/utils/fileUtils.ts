/**
 * Utility functions for handling files and downloads
 */

/**
 * Downloads data as a file
 * @param data - The file data (ArrayBuffer)
 * @param filename - The name of the file to download
 * @param mimeType - The MIME type of the file (default: application/pdf)
 */
export const downloadFile = (
  data: ArrayBuffer,
  filename: string,
  mimeType: string = 'application/pdf'
): void => {
  // Create a blob from the data
  const blob = new Blob([data], { type: mimeType });

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // Append the link to the document, click it, and remove it
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 100);
};

/**
 * Opens a PDF in a new browser tab
 * @param data - The PDF data (ArrayBuffer)
 */
export const openPdfInNewTab = (data: ArrayBuffer): void => {
  // Create a blob from the data
  const blob = new Blob([data], { type: 'application/pdf' });

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Open the URL in a new tab
  window.open(url, '_blank');

  // Cleanup after a delay
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 100);
};
