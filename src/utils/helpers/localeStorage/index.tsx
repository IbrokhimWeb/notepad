type LocalStorageKeyType = string;

class ApiStorage {
  public get(key: LocalStorageKeyType) {
    if (typeof window !== "undefined") return localStorage?.getItem(key)!;
  }

  public set(key: string, savingData: any): void | undefined {
    if (typeof window !== "undefined") {
      if (typeof savingData === "object") {
        savingData = JSON.stringify(savingData);
      }
      localStorage?.setItem(key, savingData as string);
    }
  }

  public remove(key: LocalStorageKeyType) {
    if (typeof window !== "undefined") {
      if (key in localStorage) {
        localStorage?.removeItem(key);
      }
    }
  }

  public clear() {
    if (typeof window !== "undefined") {
      localStorage?.clear();
    }
  }
}

export const localeDatabase = new ApiStorage();
