import { useState, useEffect } from 'react'
// Mock data for testing
const dataJson = '{"response_code":0,"results":[{"type":"boolean","difficulty":"hard","category":"Politics","question":"George Clinton, Vice President of the United States (1805-1812), is an ancestor of President Bill Clinton.","correct_answer":"False","incorrect_answers":["True"]},{"type":"boolean","difficulty":"hard","category":"Vehicles","question":"The term &quot;GTO&quot; was originated by Ferrari?","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"General Knowledge","question":"Spoon theory is a theory, utilizing &quot;Spoons&quot; as a metaphor for energy they can use in a day.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"Celebrities","question":"Lady Gaga&#039;s real name is Stefani Joanne Angelina Germanotta.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"Entertainment: Books","question":"Harry Potter was born on July 31st, 1980.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"Entertainment: Video Games","question":"Unturned originally started as a Roblox game.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"Entertainment: Japanese Anime &amp; Manga","question":"In the &quot;Kagerou Daze&quot; series, Shintaro Kisaragi is prominently shown with the color red.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"Entertainment: Japanese Anime &amp; Manga","question":"The protagonist in &quot;Humanity Has Declined&quot; has no discernable name and is simply referred to as &#039;I&#039; for most of the series.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"Mythology","question":"Rannamaari was a sea demon that haunted the people of the Maldives and had to be appeased monthly with the sacrifice of a virgin girl.","correct_answer":"True","incorrect_answers":["False"]},{"type":"boolean","difficulty":"hard","category":"History","question":"Japan was part of the Allied Powers during World War I.","correct_answer":"True","incorrect_answers":["False"]}]}'

/**
 * Custom hook for fetching data using the Fetch API.
 * @param {string} url - The URL for the API endpoint.
 * @returns {Object} - An object containing state values and functions for fetching data.
 */
export const useFetch = <T>(url: string): { data: T | null; isLoading: boolean; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result: T = await response.json();
        setData(result);
      } catch (error) {
          setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data: JSON.parse(dataJson), isLoading, error };
};

