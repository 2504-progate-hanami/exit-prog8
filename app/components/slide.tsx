import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import type { ProblemInstruction } from "../types/problem";
import type { CSSProperties, JSX } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isSlideModalAtom, problemAtom } from "~/atoms";

export function Slide({ id }: { id: number }): JSX.Element {
  const [lesson, setLesson] = useState<ProblemInstruction | null>(null);
  const [, setIsModalOpen] = useAtom(isSlideModalAtom);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const problem = useAtomValue(problemAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsVisible(false);
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    const loadLesson = async () => {
      try {
        if (problem && problem.instructions && problem.instructions[0]) {
          setLesson({
            title: problem.instructions[0].title,
            description: problem.instructions[0].description,
            imgSrc: problem.instructions[0].imgSrc,
          });
        } else {
          console.error(`Lesson ${id} is missing required data.`);
          setLesson(null);
        }
      } catch (error) {
        console.error(`Failed to load lesson ${id}:`, error);
        setLesson(null);
      }
    };
    loadLesson();
  }, [id]);

  if (!isVisible) {
    return <></>;
  }

  if (!lesson) {
    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.loadingContainer}>
          <div style={modalStyles.loadingSpinner}></div>
          <span>Loading lesson...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modalContainer} ref={modalRef}>
        <CreateSlide
          imgSrc={lesson.imgSrc}
          title={lesson.title}
          description={lesson.description}
          name={`Lesson ${id}`}
          onClose={() => {
            setIsVisible(false);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

const modalStyles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    zIndex: 1001,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 25px rgba(0, 0, 0, 0.3)",
    animation: "modalFadeIn 0.3s ease-out",
  },
  loadingContainer: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingSpinner: {
    width: "30px",
    height: "30px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  },
};

function CreateSlide({
  imgSrc,
  title,
  description,
  name,
  onClose,
}: ProblemInstruction & { name: string; onClose: () => void }) {
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
      width: "650px",
      minHeight: "450px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "rgba(0, 0, 0, 0.6)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 10,
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background 0.2s",
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
      top: "30px",
      right: "10px",
      zIndex: 3,
      padding: "10px",
      width: "auto",
      overflowY: "auto",
      textAlign: "right",
    },
    description: {
      color: "#666",
      fontSize: "0.95em",
      lineHeight: "1.5",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      textAlign: "left",
      padding: "10px",
      maxHeight: "250px",
      overflowY: "auto",
    },
    imageContainer: {
      zIndex: 1,
      position: "absolute",
      left: "25px",
      right: "25px",
      top: imageTop,
      marginBottom: "10px",
      overflow: "hidden",
    },
    imageAspectRatio: {
      paddingBottom: "56.25%",
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
      <button style={styles.closeButton} onClick={onClose}>
        ×
      </button>
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
