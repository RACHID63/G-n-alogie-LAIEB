import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

interface GroundingSource {
  title: string;
  uri: string;
  domain: string;
}

function extractDomain(uri: string): string {
  try {
    return new URL(uri).hostname.replace(/^www\./, '');
  } catch {
    return uri;
  }
}

async function createApp() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.post('/api/search-family', async (req: Request, res: Response) => {
    const rawQuery = typeof req.body?.query === 'string' ? req.body.query : '';
    const cleanQuery = rawQuery.trim().replace(/\s+/g, ' ');

    if (cleanQuery.length < 2 || cleanQuery.length > 100) {
      res.status(400).json({
        error: 'Veuillez saisir un nom de famille valide (entre 2 et 100 caractères).',
      });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error:
          "La recherche sur Internet nécessite une clé GEMINI_API_KEY configurée côté serveur.",
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      const prompt = `Effectue une recherche sur Internet en français au sujet du nom de famille (patronyme) "${cleanQuery}".

Présente une synthèse généalogique et historique claire, concise et rigoureuse structurée en 3 points :
1. **Origine géographique & implantation** : indique les régions où ce patronyme est attesté (en vérifiant notamment sa présence en Algérie — El Milia, wilaya de Jijel, Constantinois, Petite Kabylie — au Maghreb, en Méditerranée ou en France).
2. **Étymologie & variantes orthographiques** : signification probable du nom et transcriptions connues (français, arabe, berbère, variantes d'état civil).
3. **Archives & mentions notables** : présence dans les archives d'état civil (ANOM, Geneanet, Filae), ouvrages historiques ou personnalités liées.

Appuie-toi uniquement sur les résultats trouvés sur le Web. Si un aspect n'est pas documenté en ligne pour ce patronyme, indique-le simplement sans inventer.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const summary = response.text?.trim() || '';
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const chunks = groundingMetadata?.groundingChunks ?? [];

      const seenUris = new Set<string>();
      const sources: GroundingSource[] = [];

      for (const chunk of chunks) {
        const uri = chunk.web?.uri;
        if (uri && !seenUris.has(uri)) {
          seenUris.add(uri);
          sources.push({
            title: chunk.web?.title?.trim() || extractDomain(uri),
            uri,
            domain: extractDomain(uri),
          });
        }
      }

      const webSearchQueries = groundingMetadata?.webSearchQueries ?? [];

      res.json({
        query: cleanQuery,
        summary,
        sources,
        webSearchQueries,
      });
    } catch (error) {
      const rawMessage =
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue lors de la recherche sur Internet.';

      if (
        rawMessage.includes('429') ||
        rawMessage.includes('RESOURCE_EXHAUSTED') ||
        rawMessage.toLowerCase().includes('quota')
      ) {
        res.status(429).json({
          error:
            'Le quota de recherche Internet est temporairement atteint. Veuillez patienter un instant ou réessayer ultérieurement.',
        });
        return;
      }

      if (
        rawMessage.includes('401') ||
        rawMessage.includes('403') ||
        rawMessage.includes('API_KEY_INVALID')
      ) {
        res.status(502).json({
          error:
            "La clé d'API utilisée pour la recherche Internet est invalide ou non autorisée.",
        });
        return;
      }

      res.status(502).json({
        error:
          'Le service de recherche Internet est momentanément indisponible. Veuillez réessayer.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

createApp().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
