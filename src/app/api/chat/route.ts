import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    console.error("Error en /api/chat: La variable de entorno GEMINI_API_KEY no está configurada.");
    return NextResponse.json({ message: 'Error: La clave de API no está configurada.' }, { status: 500 });
  }

  try {
    const { messages, prompt } = await req.json();

    const contents = messages.map((msg: { role: string; content: string; }, index: number) => {
        if (index === 0 && msg.role === 'user') {
            return {
                role: 'user',
                parts: [{ text: `${prompt}\n\n${msg.content}` }]
            }
        }
        return {
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }
    });
    
    const requestBody = {
      contents: contents,
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
      ],
      generationConfig: {
          maxOutputTokens: 2048,
      }
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta de error detallada de la API de IA:", JSON.stringify(data, null, 2));
      return NextResponse.json({ message: "Lo siento, ha ocurrido un error al contactar a la IA." }, { status: response.status });
    }

    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        if (data.promptFeedback && data.promptFeedback.blockReason) {
            console.error("Contenido bloqueado por la API de IA:", data.promptFeedback);
            return NextResponse.json({ message: "Lo siento, la respuesta fue bloqueada por nuestros filtros de seguridad." }, { status: 400 });
        }
        console.error("Respuesta inesperada de la API de IA (sin candidatos):", data);
        return NextResponse.json({ message: "Lo siento, no he podido generar una respuesta." }, { status: 500 });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ message: aiResponse });

  } catch (error) {
    console.error("Error fatal en el manejador /api/chat:", error);
    return NextResponse.json({ message: "Lo siento, ha ocurrido un error interno." }, { status: 500 });
  }
}
