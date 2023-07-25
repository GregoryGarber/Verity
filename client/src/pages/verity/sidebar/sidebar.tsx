import React from "react";
import styles from "./sidebar.module.css";
import { render } from "react-dom";
import { Resizable } from "re-resizable";

const style1 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

// Create a temporary element
const tempElement = document.createElement("div");

// Set the font size to 1rem
tempElement.style.fontSize = "10rem";

// Append the element to the document body
document.body.appendChild(tempElement);

// Get the computed font size in pixels
const computedFontSize = window.getComputedStyle(tempElement).fontSize;

// Extract the pixel value from the computed font size
const pixelValue = parseFloat(computedFontSize);

// Remove the temporary element from the document
document.body.removeChild(tempElement);

const ResizableElement = (
  <Resizable
    className={styles.sidebar_main}
    minHeight="100vh"
    minWidth={pixelValue}
    maxWidth={pixelValue * 2.5}
    onResizeStop={() => resizingthing}
  >
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
    <div className={styles.sidebar_object}>test</div>
  </Resizable>
);

function resizingthing() {
  const sidebar = document.getElementsByClassName(styles.sidebar_main)[0];
  const info = sidebar.getBoundingClientRect();

  if (info.width > pixelValue * 2.5) {
    sidebar.getAttribute("style");
    const style = sidebar.attributes.getNamedItem("style");
    if (style === null) return;
    const styleValue = style.value;
    const index1 = styleValue.indexOf(" width:");
    const index2 = styleValue.indexOf(";", index1);
    const newString = styleValue.replace(
      styleValue.substring(index1, index2 + 1),
      " width: " + pixelValue * 2.5 + "px;"
    );
    style.value = newString;
  }
}

const Sidebar = () => {
  return (
    <Resizable
      className={styles.sidebar_main}
      minHeight="100vh"
      minWidth={pixelValue}
      maxWidth={pixelValue * 5}
      onResizeStop={resizingthing}
    >
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
      <div className={styles.sidebar_object}>test</div>
    </Resizable>
  );
};

export default Sidebar;
