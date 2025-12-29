import { NextRequest, NextResponse } from 'next/server';

// Asegúrate de tener esta variable de entorno configurada en tu proyecto
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ message: 'Error: La clave de API no está configurada.' }, { status: 500 });
  }

  try {
    const { messages, prompt } = await req.json();

    const lastMessage = messages[messages.length - 1];

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${prompt} El usuario dice: "${lastMessage.content}"`
            }
          ]
        }
      ]
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error en la API de IA:", errorBody);
      return NextResponse.json({ message: "Lo siento, ha ocurrido un error al contactar a la IA." }, { status: response.status });
    }

    const data = await response.json();
    
    // Extraer el texto de la respuesta de la IA
    const aiResponse = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ message: aiResponse });

  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json({ message: "Lo siento, ha ocurrido un error interno." }, { status: 500 });
  }
}
