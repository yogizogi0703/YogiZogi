import { AlertModal } from '../../components/common/AlertModal';
import { cancelReservation } from '../../api/cancelReservation';
import useAuth from '../../hooks/useAuth';
import { useCallback, useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ICancelModal {
  bookId: number | undefined;
  onClose: () => void;
}

const CancelModal = ({ bookId, onClose }: ICancelModal) => {
  const { authUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleModalClose = useCallback(() => {
    if (isLoading) return;

    setErrorMessage('');
    setAlertText('');
    setAlertOpen(false);
    onClose();
  }, [isLoading]);

  const handleSubmit = useCallback(async () => {
    // if (!authUser.isLoggedIn || !authUser.user.userId) {
    if (!authUser.isLoggedIn) {
      setErrorMessage('잘못된 사용자 정보입니다. 다시 로그인 해주세요.');
      return;
    }

    if (!bookId) {
      setErrorMessage('잘못된 예약 정보입니다.');
      return;
    }

    setIsLoading(true);
  }, [isLoading]);

  useEffect(() => {
    if (!bookId || !isLoading) return;

    const fetchReservationCancel = async () => {
      const {
        data: { status, msg }
        // } = await cancelReservation(authUser.user.userId, bookId);
      } = await cancelReservation(1, bookId);

      if (status === 'OK') {
        setAlertOpen(() => {
          setAlertText('예약을 성공적으로 취소했습니다.');
          return true;
        });
        return;
      }

      setAlertOpen(() => {
        setAlertText(`예약 취소 실패: ${msg}`);
        return true;
      });
    };

    setTimeout(() => {
      fetchReservationCancel();
    }, 2000);
  }, [isLoading]);

  return (
    <div className="p-12 pb-8 h-[21rem] md:h-80">
      <div
        className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center bg-red-500 cursor-pointer text-white"
        onClick={handleModalClose}
      >
        <AiOutlineClose />
      </div>
      <AlertModal
        content={alertText}
        modalState={alertOpen}
        handleModal={setAlertOpen}
        additionalHandler={() => location.reload()}
      />

      {!isLoading ? (
        <div>
          <h6 className="text-center font-bold text-lg">예약 취소하기</h6>
          <div className="mt-16 text-xs text-center">
            <p className="text-red-500 font-bold">
              남은 기간에 따라 모든 금액을 환불받지 못할 수도 있습니다.
            </p>
            <p className="mt-4">정말 취소하시겠습니까?</p>
          </div>

          <div className="mt-12 flex flex-col justify-center items-center">
            <p className="text-sm font-bold text-red-500 mb-4">
              {errorMessage}
            </p>
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white w-32"
              onClick={handleSubmit}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default CancelModal;
