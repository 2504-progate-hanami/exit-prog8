import { useAtom, useAtomValue } from "jotai";
import type { CSSProperties, JSX } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isSlideModalAtom, problemAtom } from "~/atoms";
import type { ProblemInstruction } from "../types/problem";

export function Slide({ id }: { id: number }): JSX.Element {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [lesson, setLesson] = useState<ProblemInstruction | null>(null);
  const [, setIsModalOpen] = useAtom(isSlideModalAtom);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const problem = useAtomValue(problemAtom);

  // スライドの総数を保持 (実際のスライド + 最後の特別スライド)
  const [totalSlides, setTotalSlides] = useState<number>(0);

  // 特別な「終了」スライドかどうかをチェック
  const isLastSpecialSlide =
    problem &&
    problem.instructions &&
    currentSlideIndex === problem.instructions.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
        setIsModalOpen(false);
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        handlePrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideIndex, totalSlides]);

  // スライドを次に進める関数
  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // スライドを前に戻す関数
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // 最後のスライドでモーダルを閉じる処理
  const handleLastSlideClose = () => {
    setIsVisible(false);
    setIsModalOpen(false);
  };

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
        if (
          problem &&
          problem.instructions &&
          problem.instructions.length > 0
        ) {
          // 実際のスライド数 + 特別なスライドの分(1つ)
          setTotalSlides(problem.instructions.length + 1);

          // 特別な最終スライドの場合
          if (isLastSpecialSlide) {
            setLesson({
              title: "学習の終了",
              description: "",
              imgSrc: undefined,
            });
          } else {
            // 通常のスライドを表示
            setLesson({
              title: problem.instructions[currentSlideIndex].title,
              description: problem.instructions[currentSlideIndex].description,
              imgSrc: problem.instructions[currentSlideIndex].imgSrc,
            });
          }
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
  }, [id, currentSlideIndex, problem, isLastSpecialSlide]);

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
          name={`Slide ${currentSlideIndex + 1}/${totalSlides}`}
          onClose={() => {
            setIsVisible(false);
            setIsModalOpen(false);
          }}
          onPrev={handlePrevSlide}
          onNext={isLastSpecialSlide ? handleLastSlideClose : handleNextSlide}
          hasPrev={currentSlideIndex > 0}
          hasNext={currentSlideIndex < totalSlides - 1}
          isLastSpecialSlide={isLastSpecialSlide}
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
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isLastSpecialSlide = false,
}: ProblemInstruction & {
  name: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isLastSpecialSlide?: boolean | null;
}) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [, setImageTop] = useState<number>(0);

  useLayoutEffect(() => {
    const nameHeight = nameRef.current?.offsetHeight || 0;
    const titleHeight = titleRef.current?.offsetHeight || 0;
    const descriptionHeight = descriptionRef.current?.offsetHeight || 0;
    const totalHeaderHeight = nameHeight + titleHeight + descriptionHeight + 30;
    setImageTop(totalHeaderHeight + 10);
  }, [name, title, description]);

  const styles: Record<string, CSSProperties> = {
    container: {
      background: isLastSpecialSlide
        ? "radial-gradient(circle, #e0f7e6 0%, #f0fff2 100%)"
        : "radial-gradient(circle, #e0f2f7 0%, #f0f8ff 100%)",
      border: isLastSpecialSlide ? "1px solid #ddffee" : "1px solid #ddeeff",
      borderRadius: "8px",
      padding: "20px",
      paddingLeft: "25px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "650px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      overflow: "hidden",
      maxHeight: "90vh",
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "rgba(0, 0, 0, 0.6)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "3rem",
      height: "3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 10,
      fontSize: "18px", // 16px → 18px に拡大
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
      position: "relative", // absoluteからrelativeに変更
      margin: "0 25px", // 左右のマージンを設定
      marginTop: "10px", // 上部に少し余白
      marginBottom: "10px",
      flexGrow: 1, // 残りのスペースを埋める
      display: "flex", // フレックスボックスを使用
      alignItems: "center", // 中央揃え
      justifyContent: "center",
      minHeight: imgSrc ? "200px" : "150px", // 画像がある場合は最小高さを確保
    },
    imageAspectRatio: {
      paddingBottom: "56.25%",
      position: "relative",
      height: "0",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "60vh", // ビューポートの60%を最大高さに
      width: "auto",
      height: "auto",
      borderRadius: "4px",
      objectFit: "contain",
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
      padding: ".8rem 1.2rem",
      cursor: "pointer",
      outline: "none",
      color: "white",
      fontSize: "1.1em",
      marginLeft: "5px",
      marginRight: "5px",
      transition: "background 0.2s",
    },
    startButton: {
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "1em",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background 0.2s",
    },
    specialSlideContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "50px",
      textAlign: "center",
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
      </div>

      {isLastSpecialSlide ? (
        <div style={styles.specialSlideContent}>
          <p style={{ fontSize: "1.2em", margin: "20px 0" }}>
            準備はできましたか？演習に進みましょう！
          </p>
          <button style={styles.startButton} onClick={onNext}>
            演習を始める
          </button>
        </div>
      ) : (
        <>
          <div style={styles.descriptionContainer}>
            <p style={styles.description} ref={descriptionRef}>
              {description}
            </p>
          </div>
          <div style={styles.imageContainer} ref={imageContainerRef}>
            <div style={styles.imageAspectRatio}>
              {imgSrc ? (
                <img src={imgSrc} alt={title} style={styles.image} />
              ) : (
                <div style={styles.ImageAspectRatio}>
                  <img src="/ninja-1.png" alt="No Image" style={styles.image} />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div style={styles.arrowContainer}>
        {!isLastSpecialSlide ? (
          <>
            <button
              style={styles.arrowButton}
              onClick={onPrev}
              disabled={!hasPrev}
            >
              {"<"}
            </button>
            <button
              style={styles.arrowButton}
              onClick={onNext}
              disabled={!hasNext}
            >
              {">"}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
