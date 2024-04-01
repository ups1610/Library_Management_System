import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/Values.css";
import { DATA, accordian, sliderSettings } from "../utils/constants/HomeData";
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel} from "react-accessible-accordion"
import {MdOutlineArrowDropDown} from "react-icons/md"
import value from "../assets/feature.jpeg"

function Values() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <>
    <section className="r-wrapper" id="value">
      <div className="paddings innerWidth r-container relative">
        <div className="r-head mb-2 flexColStart">
          <span className="orangeText">Best Libraries</span>
          <span className="primaryText">Ours Management</span>
        </div>
        <Swiper {...sliderSettings} onSwiper={setSwiperInstance}>
          {DATA.map((card, index) => (
            <SwiperSlide key={index}>
              <div className=" r-card gap-3 p-1 rounded-[10px] w-56 m-auto transition-all duration-300 hover:scale-105 hover:cursor-pointer bg-gradient-to-br from-white hover:to-purple-100 hover:shadow-lg shadow-md">
                <img
                  src={card.image}
                  alt="lib"
                  className="w-full max-w-60 rounded-lg p-2"
                />
                <div className="">
                  <span className="p-1 m-1 text-lg font-bold text-blue-950">
                    {card.name}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderButtons swiper={swiperInstance} />
      </div>
    </section>
    <Features />
    </>
  );
}

export default Values;

export const SliderButtons = ({ swiper }) => {
  const slidePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const slideNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <div className="slide-div z-50 absolute top-[4.5rem] right-5 flex items-center gap-4 font-bold">
      <button
        className="bg-gray-200 hover:bg-gray-300 px-2 rounded-md"
        onClick={slidePrev}
      >
        &lt;
      </button>
      <button
        className="bg-gray-200 hover:bg-gray-300 px-2 rounded-md"
        onClick={slideNext}
      >
        &gt;
      </button>
    </div>
  );
};

export const Features = () => {
  const [openItemIndex, setOpenItemIndex] = useState(null);

  const handleAccordionButtonClick = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <section className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div className="image-container">
            <img src={value} alt="lib" srcSet="" />
          </div>
        </div>

        {/* right side */}
        <div className="flexColStart v-right">
          <span className="orangeText">Features</span>
          <span className="primaryText">Important Features We Provide to You</span>
          <span className="secondaryText">We always ready to help by providing the best services for you. <br />
            We believe a good management to organise you library better.
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpand={false}
            preExpanded={[]}
          >
            {
              accordian.map((item, index) => {
                return (
                  <AccordionItem key={index} uuid={index}>
                    <AccordionItemHeading>
                      <AccordionItemButton className={`accordionButton flexCenter ${openItemIndex === index ? 'expanded' : ''}`} onClick={() => handleAccordionButtonClick(index)}>
                        <div className="flexCenter icon">{item.icon}</div>
                        <span className="primaryText ml-3">{item.heading}</span>
                        <div className="flexCenter icon ml-3">
                          <MdOutlineArrowDropDown className="transition-all duration-300" size={20} />
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p className="secondaryText p-2 transition-all duration-300">{item.detail}</p>
                    </AccordionItemPanel>
                  </AccordionItem>
                )
              })
            }
          </Accordion>
        </div>
      </div>
    </section>
  );
};
