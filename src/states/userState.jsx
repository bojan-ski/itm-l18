import { atom } from "recoil";
import localStorageEffect from "../effects/localStorageEffect";

export const userState = atom({
    key: 'userState',
    default: {},
    effects_UNSTABLE: [
        localStorageEffect('userData')
    ]
})