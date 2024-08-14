import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getAuthUser } from '../redux/storage';
import { fetchComments, addComment, deleteComment } from '../redux/commentService';
import '../styles/socialsection.scss';

interface SocialSectionProps {
  recipeId: string;
  commentsCount: number;
  likes: number;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  user?: {
    username: string;
  };
}

const SocialSection: React.FC<SocialSectionProps> = ({ recipeId, commentsCount, likes }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser && authUser.id) {
      setUser(authUser);
    }
    fetchComments(recipeId)
      .then(setComments)
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [recipeId]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() === '' || !user) return;
    try {
      const newComment = await addComment(recipeId, user.id, commentText);
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId, user!.id);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="social-section bd">
      <div className="social-likes"><Heart className="iconz" /> {likes}</div>
      <div className="comment-section">
        <h3>Comments {commentsCount}</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <strong>{comment.user ? comment.user.username : ''}:</strong> {comment.content}
              {comment.userId === user?.id && (
                <button className='del-btn' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
        {user ? (
          <>
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleCommentChange}
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </>
        ) : (
          <p>Trebuie sa fii inregistrat pentru a adauga un comentariu.</p>
        )}
      </div>
    </div>
  );
};

export default SocialSection;
