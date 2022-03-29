import { ActionTypes } from "../contants/action-type";

export const setClasses = (classes) => {
    return {type: ActionTypes.SET_CLASSES, payload: classes}
}
