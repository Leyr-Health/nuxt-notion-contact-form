import { Client } from "@notionhq/client"
import { FormType } from "@/types"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

export interface FormPayload {
    email: string
    type: FormType
    message: string
}

export async function saveForm(form: FormPayload) {
    return await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            title: {
                title: [
                    {
                        text: {
                            content: form.email,
                        },
                    },
                ],
            },
            Type: {
                select: {
                    name: form.type,
                },
            },
            Message: {
                rich_text: [
                    {
                        text: {
                            content: form.message,
                        },
                    },
                ],
            },
        },
    })
}

export default defineEventHandler(async (event): Promise<any> => {
    const body = await readBody(event)
    return await saveForm(body)
})
