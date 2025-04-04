import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_POST = gql`
    mutation CreatePost($authorId: ID!, $title: String!, $content: String!, $category: String!) {
        createPost(authorId: $authorId, title: $title, content: $content, category: $category) {
            id
            title
            content
            category
            aiSummary
            createdAt
            updatedAt
        }
    }
`

const EDIT_POST = gql`
    mutation UpdatePost($updatePostId: ID!, $title: String, $content: String, $category: String) {
        updatePost(id: $updatePostId, title: $title, content: $content, category: $category) {
            id
            title
            content
            category
            aiSummary
            createdAt
            updatedAt
        }
    }
`

function PostForm({ mode = 'create', data = {}, onDone }) {
    const [form, setForm] = useState({ title: '', content: '', category: 'Discussion' })
    const [createPost] = useMutation(CREATE_POST)
    const [updatePost] = useMutation(EDIT_POST)

    useEffect(() => {
        if (mode == 'edit' && data) {
            setForm({
                title: data.title || '',
                content: data.content || '',
                category: data.category || ''
            })
        }
    }, [mode, data])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (mode === 'edit') {
                const { data: updatedData } = await updatePost({ variables: { updatePostId: data.id, ...form } })
                if (updatedData) {
                    alert('Post Updated')
                    setForm({ title: '', content: '', category: 'Discussion' })
                }
            } else {
                const { data } = await createPost({ variables: { authorId: localStorage.getItem('id'), ...form } })
                if (data) {
                    alert('Post Created')
                    setForm({ title: '', content: '', category: 'Discussion' })
                }
            }

            onDone();
        } catch (error) {
            console.error("GraphQL Error: ", error)
        }
    }

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h4 className="mb-4">{mode === 'edit' ? 'Edit Post' : 'Create New Post'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <textarea
                            name="content"
                            className="form-control"
                            placeholder="Content"
                            value={form.content}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <select
                            name="category"
                            className="form-select"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Discussion">Discussion</option>
                            <option value="News">News</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        {mode === 'edit' ? 'Update Post' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostForm