import React from 'react'
import { gql, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';

const GET_HELPS = gql`
    query Helps {
        helps {
            id
            author {
                id
                username
            }
            description
            location
            isResolved
            createdAt
            updatedAt
        }
    }
`

function HelpList({ onEdit }) {
    const { data, loading, error, refetch } = useQuery(GET_HELPS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="container mt-4">
            <div className="row">
                {data?.helps.map((help) => (
                    <div key={help.id} className="col-md-6 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">Help Request</h5>
                                <h6 className="card-subtitle mb-2 text-muted">by {help.author.username}</h6>
                                <p className="card-text"><strong>Description:</strong> {help.description}</p>
                                <p className="card-text"><strong>Location:</strong> {help.location}</p>
                                <p className="card-text">
                                    <strong>Is Resolved?:</strong>{' '}
                                    <span className={help.isResolved ? 'text-success' : 'text-danger'}>
                                        {help.isResolved ? 'Yes' : 'No'}
                                    </span>
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Created At: {new Date(parseInt(help.createdAt)).toLocaleString()}
                                    </small>
                                </p>
                                {help.updatedAt && (
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Updated At: {new Date(parseInt(help.updatedAt)).toLocaleString()}
                                        </small>
                                    </p>
                                )}
                                <button
                                    className="btn btn-outline-primary btn-sm mt-2"
                                    onClick={() => onEdit(help)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-3">
                <button className="btn btn-secondary" onClick={() => refetch()}>
                    Refetch Help Requests
                </button>
            </div>
        </div>
    );
}

export default HelpList