import { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment.development";

export const textToAudioUseCase =  async  (prompt:string, voice:string) => {
    try {
        const resp = await fetch(`${environment.backendApi}/text-to-audio`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt, voice})
        });
        if (!resp.ok) {
            throw new Error(`Error fetching audio`)
        }
        const audioFile = await resp.blob();
        const url = URL.createObjectURL(audioFile);
        console.log(url)
        return {
            ok: true,
            message: prompt,
            audioUrl: url
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo generar el audio',
            audioUrl: ''
        }
    }
}