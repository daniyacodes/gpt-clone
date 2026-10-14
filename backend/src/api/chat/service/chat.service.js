import "dotenv/config"
import db from "../../../../db/db.config.js";
//select history/prev-questions
//save new question
//prompt + context
//model request

export const getRecentConversationRows = async (sessionId, limit=5) => {
    const normalizedLimit = Number.parseInt(limit, 10);
    const safeLimit = Number.isNaN(normalizedLimit) || normalizedLimit <= 0? 20: normalizedLimit;
    
    let query = `SELECT role, content FROM conversations`;
  let params = [];

  if (sessionId) {
    query += ` WHERE session_id = ?`;
    params.push(sessionId);
  } else {
    query += ` WHERE session_id IS NULL`;
  }

  query += ` ORDER BY id DESC LIMIT ?`;
  params.push(limit);

  const [rows] = await db.execute(query, params);
  return rows.reverse();
}


//==================

// DO THIS:
import { GoogleGenAI } from "@google/genai";
const GEMINI_MODEL= process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'




//* //initialize google instance to see if our key is working
const geminiClient = new GoogleGenAI({
        apiKey:process.env.GEMINI_API_KEY || 'gemini-3.5-flash-lite'
})





//!create conversations

const generateAssistantAnswer= async ({historyRows, question})=>{
    
    //format history
    const formattedHistory = historyRows.map(row=>({
        role: row.role === "assistant"? "model":"user",
        parts: [{text:row.content}]
    }))



    const chat = geminiClient.chats.create({
        model: GEMINI_MODEL,
        config:{
            maxOutputTokens:1024,//maxOutputTokens does not limit the tokens in history or your input... It only controls the generated output
            //Input tokens (history + user message)
            //         +
            // Output tokens (maxOutputTokens)
            //         =
            // Total tokens used
        },
        history: formattedHistory
    })
    

    const result = await chat.sendMessage({message: question})

    

    
    return {
        text: result.text,
        totalTokens: result.usageMetadata?.totalTokenCount || 0 
    }

}





//*to frontend
const getMessageId = async (messageId) => {
    const [rows] = await db.execute(
        `SELECT id, role, content, token_count, created_at 
        FROM conversations
        WHERE id = ?
        LIMIT 1`,
        [messageId]
    );

    if(!rows[0]) return null;
    return{
        id: rows[0].id,
        role:rows[0].role,
        content: rows[0].content,
        tokenCount: Number(rows[0].token_count || 0),
        createdAt: rows[0].created_at
        
    }
}


export async function createConversationsService({question, sessionId}) {
    try {
        //validation
        if(!question.trim()){
           let error=   new Error('question is required') 
           error.status = 400;
           throw error
        }

const safeSessionId = sessionId || null;
        // 1. Fetch past history ONLY for this specific session
        const historyRows = await getRecentConversationRows(safeSessionId, 5);

        // 2. Insert user message with session_id
       
        let [result] = await db.execute(`INSERT INTO conversations(session_id, role, content) VALUES(?, "user", ? )`, [safeSessionId, question])

      // 3. Generate response with session context
        const assistantAnswer = await generateAssistantAnswer({historyRows, question})

        // 4. Insert assistant message with session_id
        const [createAssistantMessageResult] = await db.execute(`INSERT INTO conversations (session_id, role, content, token_count) VALUES (?, ?, ?, ?)`,
    [safeSessionId, "assistant", assistantAnswer.text, assistantAnswer.totalTokens]
        )

        // Fetch created records for frontend
        const userConversation = await getMessageId(result.insertId)
        const assistantConversation = await getMessageId(createAssistantMessageResult.insertId)

        return {userConversation, assistantConversation}
        
    } catch (error) {
        throw error
    }
}