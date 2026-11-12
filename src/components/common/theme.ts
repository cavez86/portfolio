// The page follows the system colour scheme unless the visitor picks the other one with the header toggle.
// The script runs in <head> before paint and keeps following system changes while no choice is stored.

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const DARK_QUERY = '(prefers-color-scheme: dark)';

export const themeScript = `(function(){var d=document.documentElement,m=matchMedia(${JSON.stringify(DARK_QUERY)});function a(){var s=null;try{s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}d.dataset.theme=s==="dark"||s==="light"?s:m.matches?"dark":"light"}a();m.addEventListener("change",a)})()`;
