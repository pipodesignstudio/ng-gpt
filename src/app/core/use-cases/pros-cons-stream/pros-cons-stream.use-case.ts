import { TmplAstIfBlockBranch } from "@angular/compiler";
import { ProsConsResponse } from "@interfaces/pros-cons-response";
import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCase(prompt:string, abortSignal:AbortSignal)  {
    try {
        const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),
            signal: abortSignal
        });
        if (!resp.ok) {
            throw new Error(`Error fetching proscons`)
        }
        const reader = resp.body?.getReader();

        if (!reader) {
            throw new Error(`No se pudo generar el reader`)
        }

        const decoder = new TextDecoder();
        let text = '';
        while (true) {
            const {value, done} = await reader.read();

            if (done) {
                break;
            }
            const decodedChunk = decoder.decode(value, {stream: true});
            text += decodedChunk;
            yield text;
        }

        return text;

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            roles: '',
            content: 'No se pudo comprobar'
        }
    }
}