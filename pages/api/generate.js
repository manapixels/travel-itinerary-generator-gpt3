import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const generateAction = async (req, res) => {
   // Run first prompt
   console.log(`API: ${req.body.prompt}`)

   const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${req.body.prompt}`,
      temperature: 0.8,
      max_tokens: 1500,
   })

   const basePromptOutput = baseCompletion.data.choices.pop()

   res.status(200).json({ output: basePromptOutput })
}

export default generateAction
