import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { Thumb } from "./EmblaCarouselThumbsButton";
import Autoplay from "embla-carousel-autoplay";
import "./carousel.css";
import { Button, Tooltip } from "@nextui-org/react";
import {
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled,
  IconExternalLink,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router";

type PropType = {
  slides: {
    img: string;
    header: string;
    mainTag: string;
    description: string;
  }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [Fade()]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: false,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla relative">
      <div className="embla__viewport rounded-xl" ref={emblaMainRef}>
        <div className="embla__container h-[30dvh] md:h-[40dvh] lg:h-[60dvh] xl:h-[70dvh]">
          {slides.map((slide, index) => (
            <div className="embla__slide group" key={index}>
              <div
                className="embla__slide__number"
                style={{
                  backgroundImage: `url("${slide.img}")`,
                  objectFit: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center center",
                }}
              >
                <div className="flex h-full w-full flex-col items-start justify-normal gap-3 bg-gradient-to-r from-black/35 to-black/15 pl-[12%] pt-[10%] text-white sm:pl-[15%] sm:pt-[5%] md:gap-3 lg:pt-[8%] xl:gap-8">
                  <h1
                    className="text-xs text-gray-200 md:text-lg xl:text-3xl"
                    style={{ fontFamily: "K2D", fontWeight: "700" }}
                  >
                    {slide.mainTag}
                  </h1>
                  <h2 className="rounded-sm text-sm md:max-w-[100dvw] md:text-[1.4rem] md:leading-[35px] lg:max-w-[100dvw] lg:text-[2rem] xl:text-[3rem] xl:leading-[51px]">
                    {slide.header}
                  </h2>
                  <p className="line-clamp-3 max-w-[70dvw] text-xs text-white/80 sm:max-w-[50dvw] md:line-clamp-4 md:text-sm lg:max-w-[40dvw] lg:text-lg">
                    {slide.description}
                  </p>

                  <Link to={`blogs/${index}`}>
                    <button className="mt-2 flex w-40 items-center justify-center gap-1 rounded-lg bg-white text-xs capitalize text-black lg:h-[50px] xl:h-[80px] xl:w-[200px] xl:gap-3 xl:text-xl">
                      read more
                      <span>
                        <IconExternalLink className="mb-1"></IconExternalLink>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="btns-carousel absolute bottom-2 right-7 z-10 space-x-5 lg:right-10 lg:top-10 *:[&_button]:size-6 md:*:[&_button]:size-8 lg:*:[&_button]:size-10">
        <Tooltip content={"Go Previous"} className="bg-black text-white">
          <button
            className="rounded-full bg-black/30 backdrop-blur-sm"
            onClick={scrollPrev}
          >
            <IconArrowBadgeLeftFilled className="size-14 text-white" />
          </button>
        </Tooltip>
        <Tooltip content={"Go Next"} className="bg-black text-white">
          <button
            className="rounded-full bg-black/30 backdrop-blur-sm"
            onClick={scrollNext}
          >
            <IconArrowBadgeRightFilled className="size-14 text-white" />
          </button>
        </Tooltip>
      </div>
      <div className="embla-thumbs absolute bottom-0 right-0 z-10 hidden w-fit rounded-lg md:bottom-10 md:right-10 lg:block">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container p-2">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                img={slide.img}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
