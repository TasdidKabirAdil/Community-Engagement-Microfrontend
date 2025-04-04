import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_HELP = gql`
    mutation CreateHelp($authorId: ID!, $description: String!, $location: String!) {
        createHelp(authorId: $authorId, description: $description, location: $location) {
            id
            description
            location
            isResolved
            createdAt
            updatedAt
        }
    }
`

const EDIT_HELP = gql`
    mutation UpdateHelp($updateHelpId: ID!, $description: String, $location: String, $isResolved: Boolean) {
        updateHelp(id: $updateHelpId, description: $description, location: $location, isResolved: $isResolved) {
            id
            description
            location
            isResolved
            createdAt
            updatedAt
        }
    }
`

function HelpForm({ mode = 'create', data = {}, onDone }) {
    const [form, setForm] = useState({ description: '', location: '', isResolved: false })
    const [createHelp] = useMutation(CREATE_HELP)
    const [updateHelp] = useMutation(EDIT_HELP)

    useEffect(() => {
        if (mode == 'edit' && data) {
            setForm({
                description: data.description || '',
                location: data.location || '',
                isResolved: data.isResolved || ''
            })
        }
    }, [mode, data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = name === 'isResolved' ? value === 'true' : value; //convertion for boolean
        setForm({ ...form, [name]: finalValue });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (mode === 'edit') {
                const { data: updatedData } = await updateHelp({ variables: { updateHelpId: data.id, ...form } })
                if (updatedData) {
                    alert('Help post Updated')
                    setForm({ description: '', location: '', isResolved: false })
                }
            } else {
                const { data: createdData } = await createHelp({ variables: { authorId: localStorage.getItem('id'), ...form } })
                if (createdData) {
                    alert('Help post created')
                    setForm({ description: '', location: '', isResolved: false })
                }
            }

            onDone()
        } catch (error) {
            console.error("GraphQL Error: ", error)
        }
    }

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h4 className="mb-4">{mode === 'edit' ? 'Edit Help Request' : 'Create New Help Request'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Location"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {mode === 'edit' && (
                        <div className="mb-3">
                            <select
                                name="isResolved"
                                className="form-select"
                                value={form.isResolved}
                                onChange={handleChange}
                                required
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="btn btn-success w-100">
                        {mode === 'edit' ? 'Update Help' : 'Create Help'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default HelpForm