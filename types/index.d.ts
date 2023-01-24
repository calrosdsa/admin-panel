export {};
declare module 'qs'
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: ()=>void
    getLoginStatus: ()=>void
  }
}