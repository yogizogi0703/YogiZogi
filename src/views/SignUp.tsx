import InputBox from '../components/login/InputBox';
import useSignUp from '../hooks/useSignUp';
import SignLayout from '../components/login/SignLayout';

const SignUp = () => {
  const { signUpData, isDisabled, handleChangeInput, handleSubmitSignUp } =
    useSignUp();

  return (
    <SignLayout>
      <div className="absolute max-w-sm w-full pl-10 pr-10 top-1/2 left-16 -translate-y-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2">
        <h1 className="text-3xl font-bold max-md:text-white">회원가입</h1>
        <div className="divider m-0 pt-3 pb-4"></div>
        <div className="flex flex-col text-white">
          <InputBox
            title="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            value={signUpData.email}
            handleChange={handleChangeInput}
          />
          <InputBox
            title="닉네임"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={signUpData.nickname}
            handleChange={handleChangeInput}
          />
          <InputBox
            title="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={signUpData.password}
            handleChange={handleChangeInput}
          />
          <InputBox
            title="비밀번호 확인"
            name="passwordCheck"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={signUpData.passwordCheck}
            handleChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col pt-8">
          {isDisabled ? (
            <button className="btn btn-disabled max-md:text-gray-200">
              회원 가입
            </button>
          ) : (
            <button
              className="btn text-white bg-blue-700 hover:bg-blue-600 border-blue-700 hover:border-blue-600"
              onClick={handleSubmitSignUp}
            >
              회원 가입
            </button>
          )}
        </div>
      </div>
    </SignLayout>
  );
};
export default SignUp;
