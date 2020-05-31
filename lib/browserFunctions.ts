export const isBrowser = () => typeof window !== "undefined";
let tokenOnClient: string = "";
if (isBrowser()) {
  tokenOnClient = document.cookie.split("=")[1];
}

export const setLoginTrue = () => {
  return (tokenOnClient = "true");
};

export { tokenOnClient };
