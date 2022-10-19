import React, { useEffect } from "react";
import Slider from "react-slick";
import './styles.css';
import EventThumbnail from '../event-thumbnail';
import Layout from "../../constants/layout.constants";

export default function EventSlider() {

  const [settings, setSettings] = React.useState({ 
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth < Layout.MD_BREAK_POINT 
      ? 1
      : window.innerWidth < Layout.XL_BREAK_POINT
      ? 2
      : window.innerWidth < Layout.XXL_BREAK_POINT
      ? 3
      : 4,
    slidesToScroll: 1,
    arrows: true,
    center: true,
    cssEase: 'ease-in-out'
  });

  useEffect(() => {
  
    const handleResize = () => {
      setSettings({
        slidesToShow: window.innerWidth < Layout.MD_BREAK_POINT 
          ? 1
          : window.innerWidth < Layout.XL_BREAK_POINT
          ? 2
          : window.innerWidth < Layout.XXL_BREAK_POINT
          ? 3
          : 4
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
     window.removeEventListener('resize', handleResize);
    };
    
  }, []);

  return (
    <div className='EventSlider container'>

      <h2 className="text-center mb-4 text-dark">Checkout These Upcoming Events</h2>

      <Slider {...settings}>
        <div>
          <EventThumbnail 
            eventTitle="Event One" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
        <div>
          <EventThumbnail 
            eventTitle="Event Two" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
        <div>
          <EventThumbnail 
            eventTitle="Event Three" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
        <div>
          <EventThumbnail 
            eventTitle="Event Four" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
        <div>
          <EventThumbnail 
            eventTitle="Event Five" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
        <div>
          <EventThumbnail 
            eventTitle="Event Six" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
        <div>
          <EventThumbnail 
            eventTitle="Event Seven" 
            eventDescription="Some quick details about the event.">
          </EventThumbnail>
        </div>
      </Slider>
    </div>
    
  );
}
