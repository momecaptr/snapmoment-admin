"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import avatarMock from "@/../public/epicpen_6ymMwEsBEI.png"; // Моковое изображение
import { clsx } from "clsx";
import Image from "next/image";
import { Swiper as SwiperProps } from "swiper";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/pagination";

import s from "./PhotosSwiper.module.scss";
import { ArrowIosBack, ArrowIosForward } from "@momecap/ui-kit-snapmoment";

type HasUrl = { url: string | undefined | null };

type Props<T extends HasUrl> = {
  className?: string;
  classNameImage?: string;
  classNameSwiperSlide?: string;
  getIndex?: (val: number) => void;
  sliders: T[];
  styles?: string;
};

export const PhotosSwiper = <T extends HasUrl>({
                                                 className,
                                                 classNameImage,
                                                 classNameSwiperSlide,
                                                 getIndex,
                                                 sliders,
                                                 styles,
                                               }: Props<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperProps | null>(null);

  // Уникальный идентификатор для `data-` атрибутов
  const uniqueId = useRef(`swiper-${Math.random().toString(36).substr(2, 9)}`);

  const handleSwiperInit = (swiper: SwiperProps) => {
    swiperRef.current = swiper;
  };

  const handleSlideChange = (swiper: SwiperProps) => {
    setCurrentIndex(swiper.realIndex);
    if (getIndex) {
      getIndex(swiper.realIndex);
    }
  };

  // Используем `avatarMock`, если нет фотографий
  const photos = sliders.length ? sliders : [{ url: avatarMock.src }];

  return (
    <div className={clsx(s.container, className)}>
      <Swiper
        navigation={{
          nextEl: `[data-next="${uniqueId.current}"]`,
          prevEl: `[data-prev="${uniqueId.current}"]`,
        }}
        pagination={{
          clickable: true,
          el: `[data-pagination="${uniqueId.current}"]`,
          bulletClass: s.paginationBullet,
          bulletActiveClass: s.paginationBulletActive,
        }}
        className={s.photosSwiper}
        modules={[Navigation, Pagination, Keyboard, Mousewheel]}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        keyboard
        mousewheel
      >
        {photos.map((photo, i) => (
          <SwiperSlide className={clsx(s.swiperSlide, classNameSwiperSlide)} key={photo.url || i}>
            <Image
              alt={`post photo ${i}`}
              className={classNameImage}
              height={100}
              src={photo.url || ""}
              style={styles ? { filter: styles } : {}}
              width={100}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {photos.length > 1 && (
        <>
          <button
            data-prev={uniqueId.current}
            className={clsx(s.swiperButtonPrev, currentIndex === 0 && s.hidden)}
            type="button"
          >
            <ArrowIosBack />
          </button>
          <button
            data-next={uniqueId.current}
            className={clsx(s.swiperButtonNext, currentIndex === photos.length - 1 && s.hidden)}
            type="button"
          >
            <ArrowIosForward />
          </button>
          <div
            data-pagination={uniqueId.current}
            className={s.swiperPagination}
          ></div>
        </>
      )}
    </div>
  );
};
