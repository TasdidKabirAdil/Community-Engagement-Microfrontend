import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import PostList from './PostList';
import HelpForm from './HelpForm';
import HelpList from './HelpList';
import 'bootstrap/dist/css/bootstrap.min.css';

function CommunityPanel() {
    const [page, setPage] = useState('post');
    const [postMode, setPostMode] = useState('list');
    const [selectedPost, setSelectedPost] = useState(null);
    const [helpMode, setHelpMode] = useState('list');
    const [selectedHelp, setSelectedHelp] = useState(null);
    const navigate = useNavigate()

    const handlePostCreateClick = () => {
        setPostMode('create')
        setSelectedPost(null)
    }

    const handlePostEditClick = (post) => {
        setPostMode('edit')
        setSelectedPost(post)
    }

    const handlePostDone = () => {
        setPostMode('list')
        setSelectedPost(null)
    }

    const handleHelpCreateClick = () => {
        setHelpMode('create')
        setSelectedHelp(null)
    }

    const handleHelpEditClick = (post) => {
        setHelpMode('edit')
        setSelectedHelp(post)
    }

    const handleHelpDone = () => {
        setHelpMode('list')
        setSelectedHelp(null)
    }

    const handleLogout = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Community Engagement</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
      
          {/* Tab buttons */}
          <div className="mb-4">
            <div className="btn-group">
              <button
                className={`btn ${page === 'post' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPage('post')}
              >
                Posts
              </button>
              <button
                className={`btn ${page === 'help' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPage('help')}
              >
                Help Requests
              </button>
            </div>
          </div>
      
          {/* Post Section */}
          {page === 'post' && (
            <div>
              <h4 className="mb-3">Post Requests</h4>
              {postMode === 'list' ? (
                <>
                  <button className="btn btn-success mb-3" onClick={handlePostCreateClick}>
                    Create New Post
                  </button>
                  <PostList onEdit={handlePostEditClick} />
                </>
              ) : (
                <PostForm mode={postMode} data={selectedPost} onDone={handlePostDone} />
              )}
            </div>
          )}
      
          {/* Help Section */}
          {page === 'help' && (
            <div>
              <h4 className="mb-3">Help Requests</h4>
              {helpMode === 'list' ? (
                <>
                  <button className="btn btn-success mb-3" onClick={handleHelpCreateClick}>
                    Create New Help
                  </button>
                  <HelpList onEdit={handleHelpEditClick} />
                </>
              ) : (
                <HelpForm mode={helpMode} data={selectedHelp} onDone={handleHelpDone} />
              )}
            </div>
          )}
        </div>
      );
}

export default CommunityPanel;