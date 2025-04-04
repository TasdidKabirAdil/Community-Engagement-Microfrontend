import React from 'react'
import { gql, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';

const GET_POSTS = gql`
    query Posts {
        posts {
            id
            author {
                id
                username
            }
            title
            content
            category
            aiSummary
            createdAt
            updatedAt
        }
    }
`

function PostList({ onEdit }) {
    const { data, loading, error, refetch } = useQuery(GET_POSTS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="container mt-4">
            <div className="row">
                {data?.posts.map((post) => (
                    <div key={post.id} className="col-md-6 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">by {post.author.username}</h6>
                                <p className="card-text"><strong>Content:</strong> {post.content}</p>
                                <p className="card-text"><strong>Category:</strong> {post.category}</p>
                                <p className="card-text"><strong>AI Summary:</strong> AI says "{post.content}"</p>
                                <p className="card-text"><small className="text-muted">
                                    Created At: {new Date(parseInt(post.createdAt)).toLocaleString()}
                                </small></p>
                                {post.updatedAt && (
                                    <p className="card-text"><small className="text-muted">
                                        Updated At: {new Date(parseInt(post.updatedAt)).toLocaleString()}
                                    </small></p>
                                )}
                                <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => onEdit(post)}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-3">
                <button className="btn btn-secondary" onClick={() => refetch()}>
                    Refetch Posts
                </button>
            </div>
        </div>
    );
}

export default PostList