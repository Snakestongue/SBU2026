import express from "express";
const app = express();
app.use(express.json());
app.post("/process", (req, res) => {
    const { content, tone, platform, length } = req.body;
    if (!content) {
        return res.status(400).json({ error: "Missing content" });
    }
    let prompt = `
Write a ${length || "medium"} social media post.

Platform: ${platform || "general"}
Tone: ${tone || "neutral"}

Topic: ${content}

Requirements:
- Make it engaging
- Match platform style
- Add relevant hashtags at the end
`;
    return res.json({
        prompt
    });
});
app.listen(5000, () => {
    console.log("Jetson running on http://localhost:5000");
});