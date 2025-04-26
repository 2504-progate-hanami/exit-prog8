import React, { useRef, useLayoutEffect, useState } from "react";
import type { ProblemInstruction } from "../types/problem";
import type { CSSProperties } from "react";

export function Slide({
  imgSrc,
  title,
  description,
  name,
}: ProblemInstruction & { name: string }) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageTop, setImageTop] = useState<number>(0);

  useLayoutEffect(() => {
    const nameHeight = nameRef.current?.offsetHeight || 0;
    const titleHeight = titleRef.current?.offsetHeight || 0;
    const descriptionHeight = descriptionRef.current?.offsetHeight || 0;
    const totalHeaderHeight = nameHeight + titleHeight + descriptionHeight + 30;
    setImageTop(totalHeaderHeight + 10);
  }, [name, title, description]);

  const styles: Record<string, CSSProperties> = {
    container: {
      background: "radial-gradient(circle, #e0f2f7 0%, #f0f8ff 100%)",
      border: "1px solid #ddeeff",
      borderRadius: "8px",
      padding: "20px",
      paddingLeft: "25px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "600px",
      minHeight: "400px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    header: {
      zIndex: 2,
      paddingBottom: "10px",
      position: "relative",
    },
    name: {
      color: "#778899",
      fontSize: "1.1em",
      paddingLeft: "10px",
    },
    title: {
      fontSize: "1.5em",
      fontWeight: "bold",
      color: "#333",
      paddingLeft: "10px",
      marginTop: "5px",
    },
    descriptionContainer: {
      position: "absolute",
      top: "10px",
      right: "10px",
      zIndex: 3,
      padding: "10px",
      width: "auto",
      maxWidth: "300px",
      overflowY: "auto",
      textAlign: "right",
    },
    description: {
      color: "#666",
      fontSize: "0.95em",
      lineHeight: "1.3",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
    },
    imageContainer: {
      zIndex: 1,
      position: "absolute",
      left: "25px", // containerのpaddingLeftに合わせる
      right: "25px", // containerのpaddingRightに合わせる
      top: imageTop,
      marginBottom: "10px",
      overflow: "hidden", // 比率を保つためのoverflow
    },
    imageAspectRatio: {
      paddingBottom: "56.25%" /* 16:9 aspect ratio (9 / 16 * 100%) */,
      position: "relative",
      height: "0",
    },
    image: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      borderRadius: "4px",
      objectFit: "cover",
    },
    noImage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "150px",
      backgroundColor: "#e0e0e0",
      borderRadius: "4px",
      color: "#555",
    },
    noImageSvg: {
      marginBottom: "5px",
    },
    arrowContainer: {
      position: "absolute",
      bottom: "10px",
      right: "10px",
      display: "flex",
      alignItems: "center",
      zIndex: 4,
    },
    arrowButton: {
      background: "rgba(0, 0, 0, 0.7)",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
      cursor: "pointer",
      outline: "none",
      color: "white",
      fontSize: "0.9em",
      marginLeft: "4px",
      marginRight: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.name} ref={nameRef}>
          {name}
        </span>
        <h2 style={styles.title} ref={titleRef}>
          {title}
        </h2>
        <div style={styles.descriptionContainer}>
          <p style={styles.description} ref={descriptionRef}>
            {description}
          </p>
        </div>
      </div>
      <div style={styles.imageContainer} ref={imageContainerRef}>
        <div style={styles.imageAspectRatio}>
          {imgSrc ? (
            <img src={imgSrc} alt={title} style={styles.image} />
          ) : (
            <div style={styles.noImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={styles.noImageSvg}
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.5 1.5"
                />
              </svg>
              <span>No Image</span>
            </div>
          )}
        </div>
      </div>
      <div style={styles.arrowContainer}>
        <button style={styles.arrowButton}>{"<"}</button>
        <button style={styles.arrowButton}>{">"}</button>
      </div>
    </div>
  );
}
