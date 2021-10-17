import { Component } from "react";
import { withRouter } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await response.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );

    console.log("STATE IN DETAILS COMPONENT DID MOUNT", this.state);
  }

  render() {
    const { animal, breed, city, state, description, name } = this.state;
    return (
      <div className="details">
        {this.state.loading ? (
          <h2>Loading...</h2>
        ) : (
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
            <button>Adopt {name}</button>
            <p>{description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Details);
