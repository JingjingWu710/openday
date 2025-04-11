import React, { useState } from 'react';

function TopicList({data}) {

  const [searchQuery, setSearchQuery] = useState('');
  if (!data || !data.topics) {
    return <div>Loading...</div>;
  }

  const filteredTopics = data.topics
  .filter((topic) => 
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>


      <div className="col py-3">

        <img
          src={data.cover_image}
          alt="OpenDay"
          width="70%"
        />
        <br /><br />
        <h1>Open Days</h1>
        <h2>{data.description}</h2>
        <br></br>
        <p>Start Time: {data.start_time}</p>
        <p>End Time: {data.end_time}</p>
        <div className='search'>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '80%', height: '50px', fontSize: '16px' }}
          />
          </div>
          <div className="container">
            <div className="row">
              {filteredTopics.map((topic) => (
                <div className="col-md-6 col-sm-12 col-lg-4" key={topic.id}>
                  <a href={`/topic/${topic.id}`} className="card-link text-decoration-none">
                    <div className="card">
                      <img
                        src={topic.cover_image}
                        alt={topic.name}
                        className="card-img-top"
                        width="100%"
                      />
                      <div className="card-body ">
                        <h3 className="card-title">{topic.name}</h3>
                        <p className="card-text">{topic.description}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
      </div>



    </>
  );
}


export default TopicList;
