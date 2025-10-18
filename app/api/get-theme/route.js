import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Pega a chave de API das variáveis de ambiente do servidor
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Esta é a função que será executada (equivalente ao 'handler')
export async function GET(request) {
  try {
    // Usando o modelo que sabemos que funciona para você
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // --- PROMPT MELHORADO ---
    const prompt = `
            Você é um assistente criativo para jogos de festa.
            Sua tarefa é gerar UM único tema para o jogo "Ito".

            O tema DEVE ser um "espectro" claro, onde 1 é o mínimo e 100 é o máximo.
            O tema deve ser divertido, criativo e fácil de entender.

            ## Bons Exemplos de Temas (São Espectros de 1 a 100):
            - Nível de pânico ao ver este animal (1=calmo, 100=pânico total)
            - Comidas: do pior para o melhor (1=nojento, 100=delicioso)
            - Filmes: do mais superestimado ao mais subestimado
            - Habilidades: da mais inútil à mais útil
            - Personagens da ficção: do mais bondoso ao mais malvado
            - Coisas para fazer em um sábado: do mais chato ao mais divertido
            - O quão aceitável é colocar ketchup nisso? (1=inaceitável, 100=obrigatório)
            - Nível de dor ao sentir isso (1=não dói, 100=dor insuportável)

            ## Exemplos Ruins (NÃO são espectros):
            - Mangás/animes famosos
            - Filmes conhecidos
            - Comidas famosas

            Gere um tema novo que NÃO seja um dos "Bons Exemplos" acima.

            Retorne APENAS o tema, como uma string simples.
            Sem aspas.
            Sem markdown.
            Sem texto extra como "Aqui está seu tema:".
        `;
    // --- FIM DO PROMPT ---

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const theme = response.text().trim();

    // Usa NextResponse para enviar a resposta JSON
    return NextResponse.json({ theme: theme });
  } catch (error) {
    console.error("Erro na API route:", error);
    return NextResponse.json(
      { error: "Erro ao gerar o tema." },
      { status: 500 }
    );
  }
}