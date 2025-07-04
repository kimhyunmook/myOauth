import { OauthType, ParseConnectionType } from "../types/type";


export function isLogin(): boolean {
  if (window.location.href.includes('login')) {
    console.log('로그인 필요', window.location.href)
    return true
  }
  return false
}

export function parseConnection(
  { parentDom, listDom, imageDom, nameDom }: ParseConnectionType,
  cb?: () => void
) {
  const parentEl = document.querySelector(parentDom);
  if (!parentEl || parentEl === null) {
    console.log("parent element not found !!");
    return [];
  }
  const items = Array.from(parentEl.querySelectorAll(listDom)).map((list) => {
    const image = (list.querySelector(imageDom) as HTMLImageElement)?.src;
    const name = list.querySelector(nameDom)?.textContent || undefined;
    return { image, name };
  });
  if (cb) cb();
  return items;
}

export function sendMessageData(
  type: OauthType,
  dataFnc: () => any,
  time?: number
) {
  setTimeout(
    () => {
      const data = dataFnc();
      chrome.runtime.sendMessage({
        type,
        payload: data,
      });
    },
    time ? time : 1000
  );
}
