/*
Copyright (c) 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const Login = () => {
  return (      
      
      <>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email/Password Authentication Example</title>
  {/* Material Design Theming */}
  <link
    rel="stylesheet"
    href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <link rel="stylesheet" href="main.css" />
  <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
    {/* Header section containing title */}
    <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
      <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
        <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
            <h3>Firebase Authentication</h3>
        </div>
      </div>
    </header>
    <main className="mdl-layout__content mdl-color--grey-100">
      <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
        {/* Container for the demo */}
        <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
          <div className="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
            <h2 className="mdl-card__title-text">
              Firebase Email &amp; Password Authentication
            </h2>
          </div>
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            <p>
              Enter an email and password below and either sign in to an
              existing account or sign up
            </p>
            <input
              className="mdl-textfield__input"
              style={{ display: "inline", width: "auto" }}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            &nbsp;&nbsp;&nbsp;
            <input
              className="mdl-textfield__input"
              style={{ display: "inline", width: "auto" }}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <br />
            <br />
            <button
              disabled=""
              className="mdl-button mdl-js-button mdl-button--raised"
              id="quickstart-sign-in"
              name="signin"
            >
              Sign In
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              id="quickstart-sign-up"
              name="signup"
            >
              Sign Up
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              disabled=""
              id="quickstart-verify-email"
              name="verify-email"
            >
              Send Email Verification
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              id="quickstart-password-reset"
              name="verify-email"
            >
              Send Password Reset Email
            </button>
            {/* Container where we'll display the user details */}
            <div className="quickstart-user-details-container">
              Firebase sign-in status:
              <span id="quickstart-sign-in-status">Unknown</span>
              <div>
                Firebase auth <code>currentUser</code> object value:
              </div>
              <pre>
                <code id="quickstart-account-details">null</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</>

  );
};

export default Login;
