import { BsChat } from 'react-icons/bs';
import { BiShoppingBag } from 'react-icons/bi';
import { ComparisonBox } from './comparisonBox';
import { useState } from 'react';

export const FloatingIcon = () => {
  const [chatState, setChatState] = useState(false);
  const [comparisonState, setComparisonChatState] = useState(false);

  return (
    <div className="fixed bottom-[5%] flex flex-col gap-1 md:gap-5 right-1 sm:right-5 md:right-10 z-20">
      <div
        onClick={() => setChatState(!chatState)}
        className="btn btn-warning md:w-16 md:h-16 rounded-[50%]"
      >
        <BsChat className="md:w-6 md:h-6" />
      </div>
      {/* <Chat display={chatState} /> */}
      <div
        onClick={() => setComparisonChatState(!comparisonState)}
        className="btn btn-info md:w-16 md:h-16 rounded-[50%]"
      >
        <BiShoppingBag className="md:w-6 md:h-6" />
      </div>
      <ComparisonBox display={comparisonState} />
      </div>
  );
};