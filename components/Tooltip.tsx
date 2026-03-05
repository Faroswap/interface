import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import {
  Popper as PopperUnstyled,
  PopperProps as PopperUnstyledProps,
} from '@mui/base/Popper';
import React, {
  cloneElement,
  JSXElementConstructor,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { merge } from 'lodash';
import { styled } from '@mui/system';
import clsx from 'clsx';

const zIndex = 1500;
const arrowHeight = 8;

export interface TooltipProps {
  title: React.ReactNode | string;
  maxWidth?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  container?: PopperUnstyledProps['container'];
  direction?: PopperUnstyledProps['direction'];
  disablePortal?: PopperUnstyledProps['disablePortal'];
  placement?: PopperUnstyledProps['placement'];
  popperOptions?: PopperUnstyledProps['popperOptions'];
  transition?: PopperUnstyledProps['transition'];
  PopperProps?: Partial<PopperUnstyledProps>;
  onlyHover?: boolean;
  onlyClick?: boolean;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  enterDelay?: number;
  leaveDelay?: number;
  arrow?: boolean;
  disabled?: boolean;
  autoClose?: boolean;
  autoCloseTimeout?: number;
}

export const tooltipClasses = {
  arrow: 'Tooltip-arrow',
};

const StyledTooltipRoot = styled('div')(
  () => `
  z-index: ${zIndex};
  &[data-popper-placement*="bottom"] .${tooltipClasses.arrow} {
    top: 0;
    margin-top: -${arrowHeight}px;
    &::before {
      transform-origin: 0 100%;
    }
  }
  &[data-popper-placement*="top"] .${tooltipClasses.arrow} {
    bottom: 0;
    margin-bottom: -${arrowHeight}px;
    &::before {
      transform-origin: 100% 0;
    }
  }
  &[data-popper-placement*="right"] .${tooltipClasses.arrow} {
    &::before {
      transform-origin: 100% 100%;
    }
  }
  &[data-popper-placement*="left"] .${tooltipClasses.arrow} {
    &::before {
      transform-origin: 0 0;
    }
  }
  `,
);

export default function Tooltip({
  title,
  popperOptions,
  children,
  // onlyHover,
  onlyClick,
  /** This prop won't impact the enter click delay  */
  enterDelay = 100,
  /** This prop won't impact the enter click delay  */
  leaveDelay = 0,
  arrow = true,
  PopperProps,
  open: openProps,
  onOpen,
  onClose,
  disabled,
  placement = 'top',
  autoClose,
  autoCloseTimeout = 1500,
  ...attrs
}: TooltipProps) {
  const enterTooltip = useRef(false);
  const enterTrigger = useRef(false);
  const enterTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const leaveTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const [childrenRef, setChildrenRef] = useState<HTMLDivElement>();
  const [arrowRef, setArrowRef] = useState<HTMLDivElement>();

  const [open, setOpen] = useState(false);
  const clickEmit = onlyClick;

  const handleChangeOpen = (value: boolean) => {
    if (value) {
      if (openProps === undefined) {
        setOpen(true);
      }
      if (onOpen) {
        onOpen();
      }
    } else {
      if (openProps === undefined) {
        setOpen(false);
      }
      if (onClose) {
        onClose();
      }
    }
  };

  const handleAutoClose = React.useCallback(() => {
    let time: NodeJS.Timeout;
    if (autoClose) {
      time = setTimeout(() => {
        handleChangeOpen(false);
      }, autoCloseTimeout);
    }

    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoClose, autoCloseTimeout]);

  const handleOverTooltip: MouseEventHandler<HTMLDivElement> = () => {
    if (disabled || clickEmit) return;
    enterTooltip.current = true;
    clearTimeout(leaveTimer.current);
    clearTimeout(enterTimer.current);
  };

  const handleOutTooltip: MouseEventHandler<HTMLDivElement> = () => {
    if (disabled || clickEmit) return;
    enterTooltip.current = false;
    clearTimeout(leaveTimer.current);
    clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => {
      if (!enterTrigger.current && !enterTooltip.current) {
        handleChangeOpen(false);
      }
    }, leaveDelay);
  };

  const childrenProps:
    | (Partial<React.HTMLAttributes<HTMLDivElement>> &
        React.Attributes & {
          ref: React.Dispatch<React.SetStateAction<HTMLDivElement | undefined>>;
        })
    | undefined = {
    ref: setChildrenRef,
  };

  if (!disabled) {
    if (!clickEmit) {
      const onMouseEnter = () => {
        enterTrigger.current = true;
        clearTimeout(leaveTimer.current);
        clearTimeout(enterTimer.current);
        enterTimer.current = setTimeout(() => {
          handleChangeOpen(true);
          handleAutoClose();
        }, enterDelay);
      };
      const onMouseLeave = () => {
        enterTrigger.current = false;
        clearTimeout(leaveTimer.current);
        clearTimeout(enterTimer.current);
        leaveTimer.current = setTimeout(() => {
          if (!enterTrigger.current && !enterTooltip.current) {
            handleChangeOpen(false);
          }
        }, leaveDelay);
      };
      childrenProps.onMouseOut = onMouseEnter;
      childrenProps.onMouseEnter = onMouseEnter;
      childrenProps.onMouseLeave = onMouseLeave;
    } else {
      childrenProps.onClick = (evt) => {
        if (typeof children === 'object' && children.props.onClick) {
          children.props.onClick(evt);
        }
        handleChangeOpen(true);
        handleAutoClose();
      };
    }
  }

  useEffect(() => {
    return () => {
      handleChangeOpen(false);
      clearTimeout(leaveTimer.current);
      clearTimeout(enterTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PopperUnstyled
        open={openProps ?? open}
        anchorEl={childrenRef}
        slots={{
          root: StyledTooltipRoot,
        }}
        popperOptions={merge(
          {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
              {
                name: 'preventOverflow',
                options: {
                  padding: 20,
                },
              },
              ...(arrow
                ? [
                    {
                      name: 'arrow',
                      options: {
                        element: arrowRef,
                        padding: 4,
                      },
                    },
                  ]
                : []),
            ],
          },
          popperOptions,
        )}
        placement={placement}
        {...attrs}
        {...PopperProps}
      >
        <div
          className="p-3 rounded-lg text-xs	font-medium bg-paper text-secondary border whitespace-pre-wrap"
          onMouseEnter={handleOverTooltip}
          onMouseLeave={handleOutTooltip}
          onClick={(e) => e.stopPropagation()}
        >
          {title}
        </div>
        {arrow && (
          <div
            ref={(ref) => setArrowRef(ref as HTMLDivElement)}
            className={clsx(
              tooltipClasses.arrow,
              "text-paper overflow-hidden absolute w-4 h-[9px] -mb-2 bottom-0 before:content-['*'] before:origin-[100%_0%] before:m-auto before:block before:w-full before:h-full before:bg-current before:border before:rotate-45",
            )}
          />
        )}
      </PopperUnstyled>
      <ClickAwayListener
        onClickAway={() => {
          if (clickEmit) {
            handleChangeOpen(false);
          }
        }}
      >
        {cloneElement(children, childrenProps)}
      </ClickAwayListener>
    </>
  );
}
