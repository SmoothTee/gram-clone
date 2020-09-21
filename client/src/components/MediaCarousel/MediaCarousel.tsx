import Carousel from "nuka-carousel";
import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useTypedSelector } from "../../redux/hooks";

import styles from "./MediaCarousel.module.css";

interface MediaCarouselProps {
  mediaIds: number[];
}

export const MediaCarousel = ({ mediaIds }: MediaCarouselProps) => {
  const postMedia = useTypedSelector((state) => state.entities.postMedia);

  return (
    <Carousel
      disableEdgeSwiping={true}
      renderCenterLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide === 0 ? null : (
          <button onClick={previousSlide} className={styles.carousel_button}>
            <FaArrowAltCircleLeft />
          </button>
        )
      }
      renderCenterRightControls={({ nextSlide, currentSlide, slideCount }) =>
        currentSlide === slideCount - 1 ? null : (
          <button onClick={nextSlide} className={styles.carousel_button}>
            <FaArrowAltCircleRight />
          </button>
        )
      }
      renderBottomCenterControls={({ slideCount, currentSlide, goToSlide }) => (
        <>
          {slideCount > 1
            ? Array.from({ length: slideCount }, (_, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`${styles.paging_dot} ${
                      currentSlide === idx ? styles.active : ""
                    }`}
                  />
                );
              })
            : null}
        </>
      )}
    >
      {mediaIds.map((mId) => {
        const media = postMedia.byId[mId];
        return <img className={styles.image} key={mId} src={media.media_url} />;
      })}
    </Carousel>
  );
};
