import { useCallback } from 'react';

const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function useAPI() {
  const callEdgeFunction = useCallback(async (functionName: string, data: any, authToken?: string) => {
    const endpoint = `${apiUrl}/functions/v1/${functionName}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Client-Info': 'wandertwin-mobile/1.0',
      'Apikey': anonKey,
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Edge function ${functionName} error:`, error);
      throw error;
    }
  }, []);

  const chatWithAI = useCallback(async (message: string, language: string, authToken: string) => {
    return callEdgeFunction('ai-assistant', {
      message,
      language,
      context: 'user_chat'
    }, authToken);
  }, [callEdgeFunction]);

  const checkPremiumStatus = useCallback(async (authToken: string) => {
    return callEdgeFunction('premium-check', {}, authToken);
  }, [callEdgeFunction]);

  return {
    callEdgeFunction,
    chatWithAI,
    checkPremiumStatus
  };
}
