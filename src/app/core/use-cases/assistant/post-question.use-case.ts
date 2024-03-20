import { QuestionResponse } from "@interfaces/question-response.interface";
import { environment } from "environments/environment.development"


export const postQuestionUseCase = async (threadId:string, question:string) => {
    try {
        const resp = await fetch(`${environment.assistantEndpoint}/user-question`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({threadId, question})
        });
        const replies = await resp.json() as QuestionResponse[];
        return replies;
    } catch (error) {
        throw new Error('Error creating thread')
    }
}