export interface SummarizeRequest {
  text?: string;
  file?: File;
}

export interface SummarizeResponse {
  summary: string;
  success?: boolean;
  error?: string;
}

export const summarizeText = async (
  request: SummarizeRequest
): Promise<SummarizeResponse> => {
  try {
    const text = request.text || "";

    if (!text.trim()) {
      return { summary: "", success: false, error: "No text provided" };
    }

    // ✅ Call your backend instead of Gemini directly
    const res = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error("Failed to summarize");
    }

    const data = await res.json();

    return {
      summary: data.summary || "",
      success: true,
    };
  } catch (err: any) {
    console.error("Error summarizing:", err);
    return {
      summary: "",
      success: false,
      error: err.message || "Failed to summarize",
    };
  }
};

export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};
