import { createConversationsService, getRecentConversationRows } from "../service/chat.service.js";

export async function createConversationController(req, res, next) {
  try {
      const sessionId = req.headers["x-session-id"] || req.body.sessionId;
    const { question } = req.body;
    
    const result = await createConversationsService({ question, sessionId });
    
    return res.status(201).json({
      success: true,
      message: "conversation posted successfully",
      data: result
    });
  } catch (error) {
    console.error("Error from POST conversation controller:", error);
    
    // Send a structured JSON error response back to Axios
    return res.status(500).json({
      success: false,
      message: error.message || "There was an error generating a response.",
      
    });
  }
}

// ==================================================

export async function getConversationsController(req, res, next) {
  try {
      
      const sessionId = req.headers["x-session-id"] || req.query.sessionId;
      if (!sessionId) {
      return res.json({ success: true, data: { conversations: [] } });
    }
    
    const conversations = await getRecentConversationRows(sessionId, 10); 
    
    // Format response to match App.jsx expectations
    return res.json({
      success: true,
      data: {
        conversations: conversations || []
      }
    });
  } catch (error) {
    console.error("Error from GET conversation controller:", error);
    
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations.",
      
    });
  }
}

