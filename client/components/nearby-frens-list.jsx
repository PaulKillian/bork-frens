import React from 'react';
import NearbyFrensListItem from './nearby-frens-list-item';

class NearbyFrensList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frens: [],
      numberOfUsers: 0
    };
    this.getFrens = this.getFrens.bind(this);
  }

  componentDidMount() {
    this.getFrens();
  }

  getFrens() {
    const userId = parseInt(this.props.userId);
    const finalLocation = this.props.location.replaceAll(' ', '%20');

    fetch(`./api/users/find-frens/list/${finalLocation}/${userId}`)
      .then(res => res.json())
      .then(allFrens => {
        this.setState({
          frens: allFrens
        });
      }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container col-11">
        <h2 className="text-white d-flex justify-content-center mb-0 pr-3"></h2>
        <p className="text-white d-flex justify-content-center mb-0"></p>
        <div className="row d-flex align-items-end">
          <div className="col content-container mx-3 mt-1">
            {this.state.frens.map(fren => {
              return (
                <NearbyFrensListItem
                  key={fren.userId} onClick={() => this.props.setView('otherProfile', { userId: fren.userId })}
                  image={fren.imageUrl}
                  name={fren.dogName}
                  location={fren.location}
                  userId={fren.userId}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default NearbyFrensList;
