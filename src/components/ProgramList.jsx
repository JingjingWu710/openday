import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


function ProgramList({topics}) {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('ascending');

    useEffect(() => {
        const found = topics.find((t) => t.id === parseInt(id));
        setTopic(found);
        setLoading(false);
      }, [id, topics]);

    if (loading) return <div>Loading...</div>;
    if (!topic) return <div>Topic not found</div>;
    

    const sortedPrograms = [...topic.programs].sort((a, b) => {
        const dateA = new Date(a.start_time);
        const dateB = new Date(b.start_time);
        if (sortOrder === 'ascending') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'ascending' ? 'descending' : 'ascending'));
    };



    return (
        <div className="col py-3">

            <h1>{topic.name} Programs</h1>
            <p className='quote'>{topic.description}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '10%' }}>
            <button 
            type="button sort" 
            className="btn btn-secondary" 
            onClick={toggleSortOrder}>
                Sort by Date: {sortOrder === 'ascending' ? 'Earliest to Latest' : 'Latest to Earliest'}
            </button>
            </div>
            <br />
            <div className="container">
                <div className="row">
                    {sortedPrograms.map((program) => (
                        <div className="col-md-6 col-sm-12 col-lg-4" key={program.id}>
                            <div className="card">
                                <div className="card-body ">
                                    <h4 className="card-title">{program.title}</h4>
                                    <ul className="card-text">
                                        <li>{program.description_short}</li>
                                        <li>{program.location.title}</li>
                                        <li>Start at: {program.start_time}</li>
                                        <li>End at: {program.end_time} </li>
                                        <li>Location:
                                            <Link 
                                            to={`/location/${program.location.id}`}
                                            style={{ color: '#b22222' }}>
                                                {program.location.title}
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default ProgramList