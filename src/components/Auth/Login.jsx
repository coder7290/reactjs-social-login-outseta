import React from "react";
import "./Login.css";
import { connect } from "react-redux";
import { authActions } from "../../store/actions";
import { Link, Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { inputEmail, inputPassword } = this.state;
    this.props.logIn({ inputEmail, inputPassword });
  };

  logInWithGoogle = () => {
    this.props.logInWithGoogle();
  };

  render() {
    const { auth, authError } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/" } };

    if (auth.uid) return <Redirect to={from} />;
    return (
      <React.Fragment>
        <div className="login-form">
          <h3 className="h3 mb-3 font-weight-normal"> Sign in</h3>
          <div className="social-login">
            <button
              className="ml-3 btn btn-outline-primary"
              type="button"
            >
              <a href="https://ngs.outseta.com/auth?widgetMode=login#o-anonymous">Login with Outseta</a>
            </button>
          </div>
          <form className="form-signin">
            <hr />
            <p>
              New user?
              <Link to="/register">
                <i className="fas fa-user-plus" /> Sign up
              </Link>
            </p>
          </form>
          {authError ? (
            <div class="p-3 mb-2 bg-danger text-white">
              <span>{authError}</span>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: creds => dispatch(authActions.logIn(creds)),
    logInWithGoogle: () => dispatch(authActions.logInWithGoogle())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
