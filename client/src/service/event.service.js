import ApiService from "./api.service";
import APIPaths from "../constants/apipath.constants";
import Events from "../constants/events.constants";

export default class EventService {

    static async create(
        title, 
        date, 
        thumbnailFileName, 
        thumbnailXOffset, 
        thumbnailYOffset, 
        thumbnailZoomOffset, 
        startTime, 
        endTime, 
        volunteerCount, 
        description, 
        shortDescription, 
        owner) 
    {
        
        const reqPromise = ApiService.post(APIPaths.EVENTS, {
            title, date, thumbnailFileName, thumbnailXOffset, thumbnailYOffset, thumbnailZoomOffset,  startTime, endTime, volunteerCount, description, shortDescription, owner
        });

        reqPromise.then(r => {
            if(r.ok) {
                r.json().then(e => {
                    window.dispatchEvent(new CustomEvent(Events.EVENT_CREATED), {
                        details: e
                    });
                });
            }
        });

        return reqPromise;
    }

}