import React, { PropsWithChildren, useRef, MouseEventHandler } from "react";

const BoxModel = ({
  children,
  isOpenModel,
  setIsOpenModel,
}: PropsWithChildren & {
  isOpenModel: boolean;
  setIsOpenModel: any;
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsOpenModel(false);
    }
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.1)]  z-50 fixed top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center ${
        !isOpenModel && "hidden"
      } cursor-default`}
      onClick={handleClickOutside}
    >
      <div ref={boxRef}>
        {children}
      </div>
    </div>
  );
};

export default BoxModel;
