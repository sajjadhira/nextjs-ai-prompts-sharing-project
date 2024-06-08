
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req ,{params}) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");
        return new Response(JSON.stringify(prompts), {status: 200,
            headers: {
                'Cache-Control': 'no-store'
            }});
    } catch (e) {
        console.error(e);
        return new Response("Error fetching prompts", {status: 500,
            headers: {
                'Cache-Control': 'no-store'
            }});
    }
}
