
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

const setNoCacheHeaders = (response) => {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
};

export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find().populate("creator");
        let response = new Response(JSON.stringify(prompts), { status: 200 });
        response = setNoCacheHeaders(response);
        return response;
    } catch (e) {
        let response = new Response(JSON.stringify(
            {
                message: "Error fetching prompts ".concat(e.message)
            }
        ), { status: 500 });
        response = setNoCacheHeaders(response);
        return response;
    }
};