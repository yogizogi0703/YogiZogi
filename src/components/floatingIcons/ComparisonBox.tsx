export const ComparisonBox = ({ display }: { display: boolean }) => {

  return (
    <article
      className={`flex flex-col justify-between gap-2 py-2 px-2 absolute w-60 h-52 bottom-0 right-16 rounded-xl bg-[#3abff8] ${
        display ? 'block' : 'hidden'
      }`}
    >
      <div className="flex gap-1 rounded-lg bg-white">
        <figure className="w-1/2 rounded-s-lg cursor-pointer">
          <img className="rounded-s-lg h-full" />
        </figure>
        <div className="w-1/2">
          <p className="font-semibold">이름</p>
          <p>날짜 </p>
          <p>가격</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-sm bg-white">비교하기</button>
      </div>
    </article>
  );
};
