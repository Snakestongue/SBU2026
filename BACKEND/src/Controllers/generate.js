import OpenAI from "openai";
console.log("GITHUB TOKEN1", process.env.GITHUB_TOKEN2);
console.log("GITHUB TOKEN2", process.env.GITHUB_TOKEN);


// const createAI = async (req, res) => {
//     console.log("run1")
//     const { content } = req.body;
//     console.log("run2")
//     if (!content) {
//         return res.status(400).json({ message: "Fill out field" });
//     }
//     console.log("run3")
//     const githubAI = new OpenAI({
//         apiKey: process.env.GITHUB_TOKEN,
//         baseURL: "https://models.inference.ai.azure.com"
        
//     });
//     console.log("run4")
//     try {
//         const jetsonResponse = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: content, stream: false })
//     });

//     if (!jetsonResponse.ok) {
//         throw new Error("Python seafafafrver failed");
//     }

//     const data = await jetsonResponse.json();
//     const reply = data.response; // FastAPI returns { response: "..." }

//     return res.json({ result: reply });
//         const response = await githubAI.chat.completions.create({
//             model: "Llama-3.3-70B-Instruct",
//             messages: [{ role: "user", content: "tell me a joke" }],
//             max_tokens: 150
//         });
//         return res.json({
//             result: response.choices[0].message.content
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Pipeline failed "+error });
//     }
// };
// export default createAI;


const createAI = async (req, res) => {
    console.log("🔥 HIT /generate");
    const { content } = req.body;
    

    if (!content ) {
        return res.status(400).json({ message: "Fill out all fields" });
    }

    try {
        console.log("➡️ calling python");
        const jetsonResponse = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: `Generate a solution to ${content}`,
                stream: false
            })
        });

        if (!jetsonResponse.ok) {
            const text = await jetsonResponse.text();
            throw new Error(`Python server failed: ${text}`);
        }

        const data = await jetsonResponse.json();
        
        return res.json({ result: data.response });

    } catch (error) {
        // console.error(error);
        // return res.status(500).json({ message: "Pipeline failed: " + error });
        console.error("🔥 PIPELINE FAILED FULL ERROR:");
    console.error(error);

    return res.status(500).json({
        message: error.message,
        full: error.toString(),
        stack: error.stack
    });
    }
};

export default createAI;