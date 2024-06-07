
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, params) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById({
            _id: params.id
        }).populate("creator");

        if (!prompt) {
            return new Response("Prompt not found", {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (e) {
        console.error(e);
        return new Response("Error fetching prompts", {status: 500});
    }
}

// PATCH request to update a prompt

export const PATCH = async (req, params) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findByIdAndUpdate({
            _id: params.id
        }, req.body, {new: true});
        
    } catch (e) {
        console.error(e);
        return new Response("Error updating prompt", {status: 500});
    }
}

