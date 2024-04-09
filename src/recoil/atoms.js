import {atom} from 'recoil'


export const loggedInState = atom({
    key:'loggedInState',
    default:false
})
export const authTokenState = atom({
    key:'authTokenState',
    default:null
})
export const taskListState = atom({
    key: 'taskListState',
    default: [], // Initial value is an empty array
  });
  

