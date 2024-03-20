import { FC } from "react";
import { IReview } from "../../../types/types";
import likeIcon from "../../../assets/images/icons/like.svg";

interface IReviewsProps {
  reviews: IReview[];
}

const Reviews: FC<IReviewsProps> = ({ reviews }) => {
  return (
    <div className="bg-gray">
      <div className="pt-[32px] pb-80 container-two">
        <div className="max-w-[848px]">
          <h2>Отзывы</h2>
          {reviews.map((review, key) => (
            <div
              key={key}
              className="rounded-[16px] mt-[32px] p-[24px] w-full bg-white text-18  font-mulish"
            >
              <div className="flex gap-[20px]">
                <img
                  src={review.ava}
                  alt="review-ava"
                  className="w-[36px] h-[36px]"
                />
                <div>
                  <b className="font-montserrat">{review.name}</b>
                  <span className="ml-[8px] text-16 text-grey">
                    {review.pastTense}
                  </span>
                  <p className="text-grey">{review.comment}</p>
                </div>
                <div className="self-end flex-auto flex justify-end gap-[4px] items-center text-14 text-grey opacity-60">
                  <span className="leading-[19px]">{review.likes}</span>
                  <button
                    style={{ maskImage: `url(${likeIcon})` }}
                    className="w-[18px] h-[16px] bg-[currentColor]"
                  ></button>
                  {/* <img src={likeIcon} alt="like" /> */}
                </div>
              </div>
            </div>
          ))}
          <button className="box-secondary mx-auto mt-[32px] mb-80 border-green py-[12px] max-w-[416px] block w-full text-center text-green hover:brightness-75 active:brightness-110">
            Показать ещё
          </button>
          <div className="pt-[16px] px-[16px] pb-[24px] rounded-[16px] bg-white">
            <h3 className="text-18 font-bold">Добавить комментарий</h3>
            <div className="my-[16px] border border-[#DDDDDF] rounded-[24px] py-[16px] px-[24px] h-[120px]">
              <textarea
                placeholder="Ваш комментарий..."
                className="outline-none w-full h-full"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button className="btn py-[12px] max-w-[380px] w-full text-center">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
