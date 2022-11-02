import React, { useEffect, useCallback } from "react";
import Slider from "react-slick";
import './styles.css';
import EventThumbnail from '../event-thumbnail';
import Layout from "../../constants/layout.constants";
import ApiService from "../../service/api.service";
import APIPaths from "../../constants/apipath.constants";

export default function EventSlider() {

  const protoState = { 
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
    cssEase: 'ease-in-out',
    events: []
  }


  const [state, setSate] = React.useState(protoState);

  const fetchEvents = useCallback(() => {
    ApiService.get(APIPaths.EVENTS).then(r => {
        r.json().then(events => {
            setSate({...protoState, events});
        })
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents]);

  useEffect(() => {
    const handleResize = () => {
      setSate({...protoState, events: state.events});
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
     window.removeEventListener('resize', handleResize);
    };
    
  });

  return (
    <div className='EventSlider container'>

      <h2 className="text-center mb-4 text-dark">Checkout These Upcoming Events</h2>

      <Slider {...state}>
        {
            !!state.events ? state.events.map(event =>  
                <div key={event.id}>
                    <EventThumbnail
                      title={event.title}
                      description={event.shortDescription}
                      thumbnailFileName={event.thumbnailFileName}
                      offsetX={event.thumbnailXOffset} 
                      offsetY={event.thumbnailYOffset} 
                      offsetZoom={event.thumbnailZoomOffset}
                    >
                    </EventThumbnail>
                </div>) : null
        }
      </Slider>
    </div>
    
  );
}
