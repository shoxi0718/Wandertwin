import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  language: 'uz-Latin' | 'uz-Cyrillic' | 'ru' | 'en';
  context?: string;
}

interface ChatResponse {
  reply: string;
  suggestions?: string[];
  emoji?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, language, context }: ChatRequest = await req.json();

    const greetings: Record<string, string> = {
      'uz-Latin': 'Salom! Men WanderTwin AI yordamchisiman.',
      'uz-Cyrillic': 'Салом! Мен WanderTwin AI ёрдамчисиман.',
      'ru': 'Привет! Я помощник WanderTwin AI.',
      'en': 'Hello! I\'m your WanderTwin AI assistant.'
    };

    const replies: Record<string, string[]> = {
      'uz-Latin': [
        'Bu juda yaxshi savol! O\'zbekistonning eng yaxshi joylarini bilaman.',
        'Menga assalom! Sizning sayohatingizda sizga yordam berishga tayyor.',
        'Juda qiziqarli! Keling, bu joyni birga ko\'rib chiqaylik.'
      ],
      'uz-Cyrillic': [
        'Бу жуда яхши савол! Ўзбекистонning энг яхши жойларини биламан.',
        'Мен sizning sayohatingizda sizga yordam berishga tayyor.',
        'Жуда қизиқарли! Кинг, бу жойни бирга кўриб чиқайлик.'
      ],
      'ru': [
        'Отличный вопрос! Я знаю лучшие места в Узбекистане.',
        'Я готов помочь вам в вашем путешествии!',
        'Очень интересно! Давайте исследуем это место вместе.'
      ],
      'en': [
        'Great question! I know the best places in Uzbekistan.',
        'I\'m ready to help you explore!',
        'Very interesting! Let\'s discover this place together.'
      ]
    };

    const randomReply = replies[language][Math.floor(Math.random() * replies[language].length)];

    const data: ChatResponse = {
      reply: randomReply,
      suggestions: [
        language === 'uz-Latin' ? 'Mehmonxona qidirish' : language === 'uz-Cyrillic' ? 'Mehmonxona qidirish' : language === 'ru' ? 'Найти отель' : 'Find hotel',
        language === 'uz-Latin' ? 'Restoran topish' : language === 'uz-Cyrillic' ? 'Restoran topish' : language === 'ru' ? 'Найти ресторан' : 'Find restaurant',
        language === 'uz-Latin' ? 'Tarixiy joylar' : language === 'uz-Cyrillic' ? 'Tarixiy joylar' : language === 'ru' ? 'Исторические места' : 'Historical sites'
      ],
      emoji: '😊'
    };

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
