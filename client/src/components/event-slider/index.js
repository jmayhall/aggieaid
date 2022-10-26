import React, { useEffect } from "react";
import Slider from "react-slick";
import './styles.css';
import EventThumbnail from '../event-thumbnail';
import Layout from "../../constants/layout.constants";
import ApiService from "../../service/api.service";
import APIPaths from "../../constants/apipath.constants";

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
    cssEase: 'ease-in-out',
    events: []
  });

  useEffect(() => {
    ApiService.get(APIPaths.EVENTS).then(r => {
        r.json().then(res => {
            setSettings({events: res._embedded.events});
        })
    });
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
        {
            settings.events.map(event =>  
                <div key={event.id}>
                    <EventThumbnail
                        title={event.title}
                        thumbnailFileName={event.thumbnailFileName}
                        description="Some quick details about the event.">
                    </EventThumbnail>
                </div>)
        }
      </Slider>
    </div>
    
  );
}
