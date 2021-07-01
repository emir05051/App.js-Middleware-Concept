import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

export default async () => {
  try {
    const user_id = req.user.user_id;
    const { comment = null } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "No comment" });
    }

    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).json({ message: "Post with ID wasn't defined" });
    }

    const newComment = new Comment({
      body: comment,
      created_at: Date.now(),
      author: user_id,
    });

    const addedComment = await newComment.save();

    const updatedComments = [...post.comments, { ...addedComment }];

    //
    await Post.findByIdAndUpdate(
      post._id,
      { comments: updatedComments },
      { rawResult: true },
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error " });
        }
        return res.status(201).json({ message: "Success" });
      }
    );
  } catch (e) {
    console.log(e);
  }
};
