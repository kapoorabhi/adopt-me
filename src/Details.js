import { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: true,
  //   };
  // }

  // Below way to do using class properties via babel
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;
    return (
      <div className="details">
        {this.state.loading ? (
          <h2>Loading...</h2>
        ) : (
          <Fragment>
            <Carousel images={images} />
            <div>
              <h1>{name}</h1>
              <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <button
                    onClick={this.toggleModal}
                    style={{ backgroundColor: theme }}
                  >
                    Adopt {name}
                  </button>
                )}
              </ThemeContext.Consumer>

              <p>{description}</p>
              {showModal ? (
                <Modal>
                  <div>
                    <h2>Would you like to adopt {name}?</h2>
                    <div className="buttons">
                      <button onClick={this.adopt}>Yes</button>
                      <button onClick={this.toggleModal}>No</button>
                    </div>
                  </div>
                </Modal>
              ) : null}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
