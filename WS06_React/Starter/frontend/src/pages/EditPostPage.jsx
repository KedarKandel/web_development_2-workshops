import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";

// TODO (student): Implement edit flow.
// Suggested steps:
// 1) Fetch existing post with GET /api/posts/:id.
// 2) Pass fetched data to PostForm as initialData.
// 3) On submit, send PUT /api/posts/:id.
// 4) Navigate back to /posts/:id after successful save.
function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO (student): Replace this placeholder with GET /api/posts/:id fetch logic.
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPost();
    setLoading(false);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(e.target);
    const updatePostData = {
      title: formData.get("title"),
      author: formData.get("author"),
      content: formData.get("content"),
    };

    //console.log("Submitting updated post data:", updatePostData);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePostData),
      });

      // console.log("Response status:", response.status);
      if (!response.ok) {
        setError(`Failed to update post. Status: ${response.status}`);
        setSubmitting(false);
        return;
      }
      const updatedPost = await response.json();
      const newId = updatedPost.updatedPost._id ?? updatedPost.id;
      navigate(`/posts/${newId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>;
  if (error && !post) return <p className="status-msg error">{error}</p>;
  if (!post)
    return <p className="status-msg">TODO: Load a post before editing.</p>;

  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}

export default EditPostPage;
