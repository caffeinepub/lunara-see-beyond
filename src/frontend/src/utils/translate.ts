// Translates text from English to a target language using MyMemory free API
export async function translateText(
  text: string,
  targetLangCode: string,
): Promise<string> {
  if (!targetLangCode || targetLangCode === "en") return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLangCode}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch {
    return text;
  }
}

export function getLanguageCode(): string {
  return localStorage.getItem("lunara_language_code") || "en";
}
