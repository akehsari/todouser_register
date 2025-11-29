import todoSchema from "../models/todoSchema.js";

export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const existing = await todoSchema.findOne({
      title: title,
      userId: req.userId,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }
    const data = await todoSchema.create({
      title,
      userId: req.userId,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: "todo created successfully",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};