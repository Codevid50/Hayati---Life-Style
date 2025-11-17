'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function BewakoofSwiper() {
  return (
    <div className="bg-[#fff6d6] h-14 py-2 pt-25 flex items-center justify-center overflow-hidden">
      <Swiper
        direction="vertical"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={800} // makes the slide smoother
        modules={[Autoplay]}
        className="h-14 flex items-center"
      >
        <SwiperSlide>
          <div className="flex items-center justify-center gap-2">
            <Image
              src="https://images.bewakoof.com/web/ic-person-solid-black-mweb.png"
              alt="Products Sold"
              width={22}
              height={22}
              className="object-contain"
            />
            <span className="font-bold text-lg leading-none">10 Crores+</span>
            <span className="text-lg leading-none">Products Sold</span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex items-center justify-center gap-2">
            <Image
              src="https://images.bewakoof.com/web/ic-bag-solid-black-mweb.png"
              alt="Customers Bought"
              width={22}
              height={22}
              className="object-contain"
            />
            <span className="font-bold text-lg leading-none">2 Crores+</span>
            <span className="text-lg leading-none">Customers Bought</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
