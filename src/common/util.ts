export class Util {
    static dispatchCustomEvent(element: Element, type: string, detail: Object = null, bubbles: boolean = true) {
        let newEvent;
        if (window.CustomEvent) {
            newEvent = new CustomEvent(type, {
                detail: detail,
                bubbles: true
            });
        } else {
            //WARN deprecated @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/initCustomEvent
            newEvent = document.createEvent('CustomEvent');
            newEvent.initCustomEvent(type, bubbles, true, {
                detail: detail
            });
        }
        element.dispatchEvent(newEvent);
    }
}