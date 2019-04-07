import { syncStorage } from "../utils/storage";

const api = {
  v4: async function(query: string) {
    const { personalToken } = await syncStorage.getOptions();

    try {
      const response = await fetch("https://api.github.com/graphql", {
        headers: {
          "User-Agent": "kechol/enhanced-github-projects",
          Authorization: `bearer ${personalToken}`
        },
        method: "POST",
        body: JSON.stringify({ query })
      });

      const result = JSON.parse(await response.text());

      if (response.ok) {
        return result.data;
      }

      if (result.message) {
        throw new Error(result.message);
      }

      if (result.errors && result.errors.length) {
        throw new Error(...result.errors.map((e: { message: string }) => e.message));
      }

      throw new Error("Should not reach here.");
    } catch (e) {
      throw new Error(`[EGP] API Request Error: ${e.message}`);
    }
  }
};

export default api;
