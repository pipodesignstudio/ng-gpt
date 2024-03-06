import type { ProsConsResponse } from "@interfaces/pros-cons-response";
import { environment } from "environments/environment.development";

export const pronsConsUseCase = async (prompt:string) => {
    try {
        const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt})
        });
        if (!resp.ok) {
            throw new Error(`Error fetching orthography`)
        }
        const data:ProsConsResponse = await resp.json() as ProsConsResponse;
        return {
            ok: true,
            ...data
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            roles: '',
            content: 'No se pudo comprobar'
        }
    }
}