import React from 'react';

function Request(props) {
  return (
    <div className="row no-gutters border-bottom px-3 py-4">
      <div className="col-3 mr-3">
        <img className="fren-request-img " src={props.image} alt={props.name}/>
      </div>
      <div className="col-6 d-flex align-items-center">
        <p className="mb-0 pr-1">
          <span>{props.name} </span>
          wants to be your fren!
        </p>
      </div>
      <div className="col d-flex justify-content-around align-items-center">
        <i className="fas fa-check fa-lg "></i>
        <i className="fas fa-times fa-lg"></i>
      </div>
    </div>
  );
}

function FrenRequests(props) {
  const frenRequests = props.frenReq;
  const frenList = frenRequests.map(req => {
    return (
      <Request
        key={req.requestId}
        image={req.requesterImage}
        name={req.requesterName}
      />
    );
  });
  return (
    <div className="container-fluid p-0 mt-2">
      {frenList}
    </div>
  );
}

export default FrenRequests;
