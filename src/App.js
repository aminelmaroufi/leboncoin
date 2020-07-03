import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReduxToastr, { toastr } from "react-redux-toastr";
import { css } from "@emotion/core";
import { DotLoader } from "react-spinners";
import Bookings from "./components/Bookings";

const override = css`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  z-index: 999 !important;
`;

const App = () => {
  const { isFetching, error, success, message } = useSelector((state) => ({
    isFetching: state.auth.fetching,
    error: state.auth.error,
    success: state.auth.success,
    message: state.auth.message,
  }));

  useEffect(() => {
    if (success) toastr.success("Success Operation", message);
    else if (error) toastr.error("Error", message);
  }, [error, success]);

  return (
    <div>
      <header className="_2up2P" role="[banner">
        <div className="_1TRNX" style={{ zIndex: 9999 }}>
          <nav className="_1xp7y">
            <div className="_3u2Yt">
              <a href="/">
                <div className="_3gOKj">
                  <span className="kcRM9 _2HAhZ _27gjm _3Wx6b">
                    <svg width="1em" height="1em" viewBox="0 0 230 45">
                      <path
                        d="M58.29 36.625c3.604-.006 5.83-2.864 5.83-7.11 0-4.25-2.22-7.1-5.82-7.1s-5.81 2.84-5.81 7.1c0 4.256 2.206 7.104 5.8 7.11zm2.7-21.1c6.87 0 11.4 5.92 11.5 13.89 0 8.1-4.74 14.1-11.69 14.1a10 10 0 01-8.66-4.63h-.11v4.11h-7.54V6.915c0-2.75 1.83-4.47 4-4.47s4 1.72 4 4.47v12.86h.11a10.212 10.212 0 018.39-4.25zm27.76 21.1c3.61 0 5.81-2.86 5.81-7.11s-2.2-7.1-5.81-7.1c-3.61 0-5.81 2.84-5.81 7.1s2.2 7.11 5.81 7.11zm0-21.1c8.5 0 14 5.81 14 14 0 8.19-5.49 14-14 14s-14-5.81-14-14c0-8.19 5.49-14 14-14zm106.85 0c2.2 0 4.03 1.72 4.07 4.47v23h-8.07v-23c0-2.75 1.79-4.47 4-4.47zm0-14.05a4.9 4.9 0 010 9.8h-.002a4.9 4.9 0 11.003-9.8zm25.24 14.05c5.6 0 8.61 3.98 8.61 10.01v17.46h-8.07v-15.2c0-3.55-1.67-4.73-3.77-4.73-3.12 0-5.49 2.63-5.49 8.23v11.7h-8.07v-23.25c0-2.64 1.73-4.2 3.77-4.2s3.76 1.56 3.76 4.2v1h.11a10.637 10.637 0 019.15-5.22zm-46.67 21.1c3.61 0 5.82-2.86 5.82-7.11s-2.219-7.1-5.82-7.1c-3.6 0-5.81 2.84-5.81 7.1s2.21 7.11 5.81 7.11zm0-21.1c8.511 0 14 5.81 14 14 0 8.19-5.489 14-14 14-8.51 0-14-5.81-14-14 0-8.19 5.5-14 14-14zm-25.94 7c-3.5 0-5.65 2.58-5.65 7s2.15 7 5.65 7a5.407 5.407 0 004.9-2.69h.1l5.87 3.77c-2.04 3.98-6.3 5.92-11.14 5.92-8.4 0-13.57-5.81-13.57-14 0-8.19 5.17-14 13.57-14 4.84 0 9.14 1.92 11.14 5.92l-5.87 3.77h-.1a5.406 5.406 0 00-4.9-2.69zm-25.46-7c5.6 0 8.61 3.98 8.63 10.01v17.46h-8.07v-15.2c0-3.55-1.67-4.73-3.77-4.73-3.12 0-5.49 2.63-5.49 8.23v11.7h-8.08v-23.27c0-2.64 1.7-4.18 3.75-4.18s3.77 1.56 3.77 4.2v1h.11a10.627 10.627 0 019.15-5.22zm-100.23 12.4a9.966 9.966 0 00.54 3.01l9-6.67a4.48 4.48 0 00-4.12-2.34c-2.55 0-5.42 1.92-5.42 6zm7.82 9a8.32 8.32 0 006.89-4.44l5.31 3.84c-2.03 4.13-6.17 7.19-13.17 7.19a13.68 13.68 0 01-9-3.4c-3.52 2.34-6.52 3.34-9.52 3.34-6.05 0-10.32-4.05-10.32-10.13V6.845c0-2.74 1.82-4.46 4-4.46 2.18 0 4 1.72 4 4.46v25.81c0 2.6 1.14 4 3.53 4 1.3 0 2.71-.75 4.54-1.75a16.647 16.647 0 01-1.3-6.57c0-5.71 4.07-12.81 12.62-12.81 7.41 0 11.39 4.31 13.05 9.72l-14.27 10.24a5.181 5.181 0 003.64 1.44z"
                        fill="#000"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
              </a>{" "}
            </div>
          </nav>
          <div className="X9VyQ"></div>
        </div>
      </header>
      <Bookings />
      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      {isFetching && (
        <div className="loader-container">
          <DotLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={"#000"}
            loading={true}
          />
        </div>
      )}
      <footer>
        <div className="footer-title">
          <span>leboncoin 2006 - 2020</span>
        </div>
        `
      </footer>
    </div>
  );
};

export default App;
