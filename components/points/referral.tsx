import clsx from "clsx";
import { useEffect, useState } from "react";
import copy from 'copy-to-clipboard';

enum ICodeInvalid {
  LengthInvalid,
  FormatInvalid
}

export default function Referral({ urlICode }: { urlICode?: string }) {
  const [rCode, setRCode] = useState('INIT11');
  const [iCode, setICode] = useState('');
  const [iCodeInvalid, setICodeInvalid] = useState<ICodeInvalid>();
  const [copyCodeText, setCopyCodeText] = useState('Copy Code');
  const [focusInput, setFocusInput] = useState(false);
  useEffect(() => {
    if(urlICode) setICode(urlICode)
  }, [urlICode])

  useEffect(() => {
    if (iCode.length !== 6) setICodeInvalid(ICodeInvalid.LengthInvalid)
    else setICodeInvalid(undefined)
  }, [iCode])
  
  
  return <div className="flex md:flex-row flex-col flex-1 md:m-0 m-[-20px]">
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-col md:rounded-3xl p-5 bg-[#20356D] bg-no-repeat bg-right-bottom bg-[url('/points_referral_bg.png')] bg-contain">
        <div className="text-white text-[32px] font-semibold mb-3 leading-none md:max-w-[388px]">Invite your Friends to <br/> earn more points</div>
        <div className="text-[#FFFFFF80] md:max-w-[388px]">The inviter receives 10% rewards of 1 friend, KOL will get more. Apply as a KOL→</div>
        <div className="flex mt-10 gap-5 md:flex-row flex-col">
          <div className="bg-[#FFFFFF26] flex rounded-lg p-3 items-center md:w-[200px]">
            <div className="bg-[#FFFFFF1A] flex items-center justify-center rounded-lg w-10 h-10">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5981 0C13.4537 3.78756 17.8001 5.58804 21.0834 3.5148C19.01 6.798 20.8105 11.1444 24.5981 12C20.8105 12.8556 19.01 17.202 21.0834 20.4853C17.8001 18.412 13.4537 20.2124 12.5981 24C11.7425 20.2124 7.39608 18.412 4.11288 20.4853C6.186 17.202 4.38552 12.8556 0.598083 12C4.38564 11.1444 6.18612 6.798 4.11288 3.5148C7.39608 5.58792 11.7425 3.78744 12.5981 0Z" fill="white"/>
              </svg>
            </div>
            <div className="ml-5">
              <div className="text-[#FFFFFF80] text-sm">My referral Points</div>
              <div className="text-white text-2xl font-semibold mt-1">100</div>
            </div>
          </div>
          <div className="bg-[#FFFFFF26] flex rounded-lg p-3 items-center md:w-[200px]">
            <div className="bg-[#FFFFFF1A] flex items-center justify-center rounded-lg w-10 h-10">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_132_13127)">
                <path d="M13.0981 11.95C13.5814 11.4167 13.9523 10.8083 14.2106 10.125C14.4689 9.44167 14.5981 8.73333 14.5981 8C14.5981 7.26667 14.4689 6.55833 14.2106 5.875C13.9523 5.19167 13.5814 4.58333 13.0981 4.05C14.0981 4.18333 14.9314 4.625 15.5981 5.375C16.2648 6.125 16.5981 7 16.5981 8C16.5981 9 16.2648 9.875 15.5981 10.625C14.9314 11.375 14.0981 11.8167 13.0981 11.95ZM18.5981 20V17C18.5981 16.4 18.4648 15.8292 18.1981 15.2875C17.9314 14.7458 17.5814 14.2667 17.1481 13.85C17.9981 14.15 18.7856 14.5375 19.5106 15.0125C20.2356 15.4875 20.5981 16.15 20.5981 17V20H18.5981ZM20.5981 13V11H18.5981V9H20.5981V7H22.5981V9H24.5981V11H22.5981V13H20.5981ZM8.59808 12C7.49808 12 6.55642 11.6083 5.77308 10.825C4.98975 10.0417 4.59808 9.1 4.59808 8C4.59808 6.9 4.98975 5.95833 5.77308 5.175C6.55642 4.39167 7.49808 4 8.59808 4C9.69808 4 10.6398 4.39167 11.4231 5.175C12.2064 5.95833 12.5981 6.9 12.5981 8C12.5981 9.1 12.2064 10.0417 11.4231 10.825C10.6398 11.6083 9.69808 12 8.59808 12ZM0.598083 20V17.2C0.598083 16.6333 0.743917 16.1125 1.03558 15.6375C1.32725 15.1625 1.71475 14.8 2.19808 14.55C3.23142 14.0333 4.28142 13.6458 5.34808 13.3875C6.41475 13.1292 7.49808 13 8.59808 13C9.69808 13 10.7814 13.1292 11.8481 13.3875C12.9148 13.6458 13.9648 14.0333 14.9981 14.55C15.4814 14.8 15.8689 15.1625 16.1606 15.6375C16.4523 16.1125 16.5981 16.6333 16.5981 17.2V20H0.598083Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_132_13127">
                <rect width="24" height="24" fill="white" transform="translate(0.598083)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <div className="ml-5">
              <div className="text-[#FFFFFF80] text-sm">Invited users</div>
              <div className="text-white text-2xl font-semibold mt-1">3</div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex hidden flex-col rounded-3xl bg-paper">
        <div className="text-primary text-xl font-semibold p-5">History</div>
        <div className="bg-[#1A1A1B1A] text-[#1A1A1B80] flex py-[10px] px-5">
          <div className="basis-1/3">Invited address</div>
          <div className="basis-1/3">Time</div>
          <div className="basis-1/3 flex justify-end">Points</div>
        </div>
        <div className="text-[#1A1A1B] flex p-5">
          <div className="basis-1/3 font-semibold">0x56ad…1234</div>
          <div className="basis-1/3 font-semibold">2022/07/01 17:19:39</div>
          <div className="basis-1/3 flex justify-end font-semibold">+ 4,179,961</div>
        </div>
        <div className="text-[#1A1A1B] flex p-5">
          <div className="basis-1/3 font-semibold">0x56ad…1234</div>
          <div className="basis-1/3 font-semibold">2022/07/01 17:19:39</div>
          <div className="basis-1/3 flex justify-end font-semibold">+ 4,179,961</div>
        </div>
      </div>
    </div>
    <div className="md:w-[375px] md:ml-3 p-5 md:p-0">
      <div className="flex bg-paper rounded-3xl p-5 md:mb-3 mb-5 flex-col">
        <div className="text-lg font-semibold mb-5">My referral link</div>
        <div className="mb-4 flex relative gap-2">
          {
            Array.from({ length: 6 }, (_, i) => i).map(index => {
              return <div key={index} className="rounded-lg h-16 flex-1 bg-white flex items-center justify-center text-active text-lg font-extrabold">{rCode[index]}</div>
            })
          }
          <input className="absolute opacity-0 w-full h-full" maxLength={6} value={rCode}/>
        </div>
        <div>
          <button 
            className="bg-primary flex w-full h-12 items-center justify-center text-white rounded-lg mt-4 font-semibold"
            onClick={() => {
              copy(rCode);
              setCopyCodeText('Copied');
              setTimeout(() => setCopyCodeText('Copy Code'), 2000)
            }}
          >
            {copyCodeText}
          </button>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="text-sm text-secondary w-[178px]">
            Share your referral link and earn more points!
          </div>
          <div className="flex items-center justify-center bg-paperDarkContrast w-[120px] h-[44px] rounded-3xl cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 15H5C3.61667 15 2.4375 14.5125 1.4625 13.5375C0.4875 12.5625 0 11.3833 0 10C0 8.61667 0.4875 7.4375 1.4625 6.4625C2.4375 5.4875 3.61667 5 5 5H9V7H5C4.16667 7 3.45833 7.29167 2.875 7.875C2.29167 8.45833 2 9.16667 2 10C2 10.8333 2.29167 11.5417 2.875 12.125C3.45833 12.7083 4.16667 13 5 13H9V15ZM6 11V9H14V11H6ZM11 15V13H15C15.8333 13 16.5417 12.7083 17.125 12.125C17.7083 11.5417 18 10.8333 18 10C18 9.16667 17.7083 8.45833 17.125 7.875C16.5417 7.29167 15.8333 7 15 7H11V5H15C16.3833 5 17.5625 5.4875 18.5375 6.4625C19.5125 7.4375 20 8.61667 20 10C20 11.3833 19.5125 12.5625 18.5375 13.5375C17.5625 14.5125 16.3833 15 15 15H11Z" fill="#1F1F1F"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex bg-paper rounded-3xl p-5 flex-col">
        <div className="text-lg font-semibold mb-5">Invited by</div>
        <div className="mb-4 flex relative gap-2">
          {
            Array.from({ length: 6 }, (_, i) => i).map(index => {
              return <div key={index} className={clsx("rounded-lg h-16 flex-1 bg-white flex items-center justify-center text-active text-lg font-extrabold border", focusInput && iCode.length - 1 === index ? 'border-[#326AFD]' : '')}>{iCode[index]}</div>
            })
          }
          <input className="absolute opacity-0 w-full h-full" maxLength={6} value={iCode} onFocus={() => setFocusInput(true)} onBlur={() => setFocusInput(false)} onChange={(e) => setICode(e.target.value.toUpperCase())}/>
        </div>
        <div>
          <button 
            className={clsx("flex w-full h-12 items-center justify-center text-white rounded-lg mt-4 font-semibold", iCodeInvalid !== undefined ? 'bg-[#1A1A1B1A]' : 'bg-primary')}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    <div className="md:hidden flex flex-col rounded-3xl bg-paper mx-5 md:m-0">
      <div className="text-primary text-xl font-semibold p-5">History</div>
      <div className="bg-[#1A1A1B1A] text-[#1A1A1B80] flex py-[10px] px-5 text-sm">
        <div className="md:basis-1/3 basis-1/2">Invited address</div>
        <div className="md:basis-2/3 basis-1/2">
          <div className="md:flex hidden basis-1/2">Time</div>
          <div className="md:basis-1/2 flex justify-end">Points</div>
        </div>
      </div>
      <div className="text-[#1A1A1B] flex px-5 py-[10px] md:py-5 text-sm md:text-base">
        <div className="md:basis-1/3 basis-1/2 flex items-center">0x56ad…1234</div>
        <div className="md:basis-2/3 basis-1/2 flex flex-col-reverse">
          <div className="flex basis-1/2 text-xs md:text-base text-secondary md:text-primary justify-end md:justify-start">2022/07/01 17:19:39</div>
          <div className="md:basis-1/2 flex justify-end">+ 4,179,961</div>
        </div>
      </div>
      <div className="text-[#1A1A1B] flex px-5 py-[10px] md:py-5 text-sm md:text-base">
        <div className="md:basis-1/3 basis-1/2 flex items-center">0x56ad…1234</div>
        <div className="md:basis-2/3 basis-1/2 flex flex-col-reverse">
          <div className="flex basis-1/2 text-xs md:text-base text-secondary md:text-primary justify-end md:justify-start">2022/07/01 17:19:39</div>
          <div className="md:basis-1/2 flex justify-end">+ 4,179,961</div>
        </div>
      </div>
    </div>
  </div>
}