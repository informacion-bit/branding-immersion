import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, prompt } = await req.json();

    // Lógica para comunicarse con la API de un modelo de lenguaje (por ejemplo, OpenAI)
    // y obtener una respuesta.

    const lastMessage = messages[messages.length - 1];

    // Simulación de una respuesta de la IA
    const aiResponse = `Has dicho: "${lastMessage.content}". Estoy procesando tu solicitud.`;

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json({ message: "Lo siento, ha ocurrido un error." }, { status: 500 });
  }
}
