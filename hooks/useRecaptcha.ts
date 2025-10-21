import { useRef } from 'react';

const grecaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
const recaptchaElId = 'robot-id';

export const useRecaptcha = () => {
  const recaptchaContainer = useRef<HTMLDivElement>(null);
  const renderRecaptcha = (): Promise<string> => {
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render(recaptchaElId, {
          sitekey: grecaptchaKey,
          callback(recaptcha: string) {
            resolve(recaptcha);
          },
        });
      });
    });
  };

  const resetRecaptchElement = () => {
    const oldRobot = document.getElementById(recaptchaElId);
    oldRobot?.remove();
    if (recaptchaContainer.current) {
      const robot = document.createElement('div');
      robot.setAttribute('id', recaptchaElId);
      recaptchaContainer.current?.appendChild(robot);
    }
  };

  return {
    recaptchaContainer,
    renderRecaptcha,
    resetRecaptchElement,
  };
};
