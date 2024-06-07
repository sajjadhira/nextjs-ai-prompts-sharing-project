
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");
        console.log(prompt)

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

export const PATCH = async (req, {params}) => {
    try {
        await connectToDB();

        const { prompt, tag } = await req.json();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response(
                {
                    message: "Prompt not found"
                }, {status: 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
        
    } catch (e) {
        console.error(e);
        return new Response({
            message: "Error updating prompt"
        }, {status: 500});
    }
}


// DELETE request to delete a prompt

export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", {status: 404});
        }

        await existingPrompt.remove();

        return new Response(JSON.stringify({
            message: "Prompt deleted successfully"
        }), {status: 200});
        
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({
            message: "Error deleting prompt"
        }), {status: 500});
    }
}
