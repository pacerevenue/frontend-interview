import { promises as fsPromises } from "fs";

export class EventService<T> {
  private readonly filePath: string;
  private generateId = Math.floor(Math.random() * 6) + 1;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  _parsedJSONData = (data) =>
    data.map((item) => {
      if (typeof item === "string") {
        return JSON.parse(item);
      } else {
        return item;
      }
    });

  async saveDataToFile(data: T[]): Promise<void> {
    try {
      const serializedData = JSON.stringify(
        { ...data, id: this.generateId },
        null,
        2
      );
      const existingData = await this.readDataFromFile();

      const updatedData = [...(existingData || []), serializedData];
      await fsPromises.writeFile(
        this.filePath,
        JSON.stringify(updatedData, null, 2),
        "utf-8"
      );

      console.log(`Data saved to ${this.filePath}`);
    } catch (error) {
      console.error(`Error saving data to file: ${error.message}`);
    }
  }

  async readDataFromFile(): Promise<T[] | null> {
    try {
      const fileContent = await fsPromises.readFile(this.filePath, "utf-8");
      const sanitizedJsonString = fileContent.replace(/\\n/g, "");
      return this._parsedJSONData(JSON.parse(sanitizedJsonString));
    } catch (error) {
      console.error(`Error reading data from file: ${error.message}`);
      return null;
    }
  }
}
