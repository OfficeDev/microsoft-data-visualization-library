import React from "react";

export const Container = (props) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      background: "#f3f2f1",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "960px",
        minHeight: "400px",
        background: "white",
        borderRadius: "4px",
        padding: "24px",
        margin: "32px",
        boxSizing: "border-box",
        boxShadow:
          "rgba(17, 12, 46, 0.075) 0px 48px 100px 0px, rgba(0, 0, 0, 0.075) 0px 60px 20px -60px",
      }}
    >
      {props.children}
    </div>
  </div>
);

export const DarkContainer = (props) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      background: "#1B1A1A",
      color: "#fff",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "960px",
        minHeight: "400px",
        background: "#2D2C2C",
        borderRadius: "4px",
        padding: "24px",
        margin: "32px",
        boxSizing: "border-box",
        boxShadow:
          "rgba(0, 0, 0, 0.75) 0px 48px 100px 0px, rgba(0, 0, 0, 0.75) 0px 60px 20px -60px",
      }}
    >
      {props.children}
    </div>
  </div>
);

export const HighContrastContainer = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      background: "#000",
    }}
  >
    <style>
      {`
        .hc-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 960px;
          min-height: 400px;
          background: #000;
          border-radius: 4px;
          padding: 24px;
          margin: 32px;
          box-sizing: border-box;
          border: 1px solid white;
        }

        .hc-container:hover {
          border-color: #1aebff;
        }

        .hc-container canvas:focus {
          box-shadow: inset 0 0 0 2px #1aebff;
        }
      `}
    </style>
    <div className="hc-container">{props.children}</div>
  </div>
);

export const TrendLineContainer = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      background: "#f3f2f1",
      fontFamily: "Segoe UI, system-ui, sans-serif",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "260px",
        minHeight: "100px",
        background: "white",
        borderRadius: "4px",
        padding: "6px 24px 24px 24px",
        margin: "24px",
        boxSizing: "border-box",
        boxShadow:
          "rgba(17, 12, 46, 0.075) 0px 48px 100px 0px, rgba(0, 0, 0, 0.075) 0px 60px 20px -60px",
      }}
    >
      {props.children}
    </div>
  </div>
);

export const TrendLineHighContrastContainer = (props) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      background: "#000",
      color: "#fff",
      fontFamily: "Segoe UI, system-ui, sans-serif",
    }}
  >
    <style>
      {`
        .hc-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 260px;
          min-height: 100px;
          background: #000;
          border-radius: 4px;
          padding: 6px 24px 24px 24px;
          margin: 24px;
          box-sizing: border-box;
          border: 1px solid white;
        }

        .hc-container:hover {
          border-color: #1aebff;
        }

        .hc-container canvas:focus {
          box-shadow: inset 0 0 0 2px #1aebff;
        }
      `}
    </style>
    <div className="hc-container">{props.children}</div>
  </div>
);

export const TrendLineDarkContainer = (props) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      background: "#1B1A1A",
      color: "#fff",
      fontFamily: "Segoe UI, system-ui, sans-serif",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "260px",
        minHeight: "100px",
        background: "#2D2C2C",
        borderRadius: "4px",
        padding: "6px 24px 24px 24px",
        margin: "24px",
        boxSizing: "border-box",
        boxShadow:
          "rgba(0, 0, 0, 0.75) 0px 48px 100px 0px, rgba(0, 0, 0, 0.75) 0px 60px 20px -60px",
      }}
    >
      {props.children}
    </div>
  </div>
);
