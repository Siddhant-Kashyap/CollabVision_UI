import {selector} from 'recoil'
import { loggedInState, authTokenState } from '../atoms';


export const isLoggedInSelector =selector({
    key:'isLoggedInSelector',
    get:({get})=>{
        return get(loggedInState)
    }
})
export const authTokenSelector = selector({
    key: 'authTokenSelector',
    get: ({ get }) => {
      return get(authTokenState);
    },
  });
  
 