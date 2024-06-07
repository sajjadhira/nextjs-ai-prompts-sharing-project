
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");
        console.log(prompt)

        if (!prompt) {
            return new Response(JSON.stringify(
                {
                    message: "Prompt not found"
                }
            ), {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify(
            {
                message: "Error fetching prompt! ".concat(e)
            }
        ), {status: 500});
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
            message: "Error updating prompt! ".concat(e)
        }, {status: 500});
    }
}


// DELETE request to delete a prompt

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        // await Prompt.findByIdAndRemove(params.id);
        let promptToDelete = await Prompt.findById(params.id);

        if (!promptToDelete) {
            return new Response(JSON.stringify({
                message: "Prompt not found or already deleted."
            }), { status: 404 });
        }

        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify({
            message: "Prompt deleted successfully."
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error deleting prompt. ".concat(error)
        }), { status: 500 });
    }
};
