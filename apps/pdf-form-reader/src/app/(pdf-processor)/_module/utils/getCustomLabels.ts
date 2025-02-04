'use server';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads the custom label mapping from the specified file in the "mappings" folder.
 * @param filename The name of the mapping file (e.g., "fw8ben.json").
 * @returns A Promise resolving to the parsed custom label JSON object or throwing an error if not found.
 */
export const getCustomLabels = async (
  filename: string
): Promise<Record<string, string> | null> => {
  try {
    // Define the folder path
    const mappingsFolder = path.join(__dirname, 'mappings');

    // Construct the full path to the file
    const filePath = path.join(mappingsFolder, filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filename}`);
      return null;
    }

    // Read the file content asynchronously
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');

    // Parse and return the JSON content
    return JSON.parse(fileContent);
  } catch (error: any) {
    console.log(`Error reading custom label file: ${error.message}`);
    return null;
  }
};

export const getFileNameType = (filename: string) => {
  const [fileName, fileType] = filename.split('.');
  return { fileName, fileType };
};
