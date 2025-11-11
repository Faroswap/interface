import clsx from 'clsx';

export default function UpdateTime({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex items-center gap-1 px-2 h-6 rounded-lg text-active text-xs font-semibold bg-[linear-gradient(90deg,rgba(254,233,79,0.3),rgba(50,106,253,0.3))] whitespace-nowrap w-max',
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.425 10.9083L10.675 9.15833L11.4917 8.34166L13.2417 10.0917L12.425 10.9083ZM10.325 3.90833L9.50833 3.09166L11.2583 1.34166L12.075 2.15833L10.325 3.90833ZM3.675 3.90833L1.925 2.15833L2.74166 1.34166L4.49166 3.09166L3.675 3.90833ZM1.575 10.9083L0.758331 10.0917L2.50833 8.34166L3.325 9.15833L1.575 10.9083ZM3.39791 12.25L4.34583 8.15208L1.16666 5.39583L5.36666 5.03125L7 1.16666L8.63333 5.03125L12.8333 5.39583L9.65416 8.15208L10.6021 12.25L7 10.0771L3.39791 12.25Z"
          fill="currentColor"
        />
      </svg>
      Points will be updated every 24 hours
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.425 10.9083L10.675 9.15833L11.4917 8.34166L13.2417 10.0917L12.425 10.9083ZM10.325 3.90833L9.50833 3.09166L11.2583 1.34166L12.075 2.15833L10.325 3.90833ZM3.675 3.90833L1.925 2.15833L2.74166 1.34166L4.49166 3.09166L3.675 3.90833ZM1.575 10.9083L0.758331 10.0917L2.50833 8.34166L3.325 9.15833L1.575 10.9083ZM3.39791 12.25L4.34583 8.15208L1.16666 5.39583L5.36666 5.03125L7 1.16666L8.63333 5.03125L12.8333 5.39583L9.65416 8.15208L10.6021 12.25L7 10.0771L3.39791 12.25Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
