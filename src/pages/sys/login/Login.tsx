import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import LocalePicker from '@/components/locale-picker';
import DashboardImg from '@/assets/images/background/dashboard.png';
import { useUserToken } from '@/store/userStore';

import LoginForm from './LoginForm';
import MobileForm from './MobileForm';
import QrCodeFrom from './QrCodeForm';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';
import { LoginStateProvider } from './providers/LoginStateProvider';

function Login() {
  const { t } = useTranslation();
  const token = useUserToken();
  // 判断用户是否有权限
  if (token.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <main className="relative flex min-h-screen flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center bg-no-repeat xl:flex"
        style={{
          background:
            'linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)) center center / cover no-repeat,url(/src/assets/images/background/overlay_2.jpg)',
        }}
      >
        <img className="max-w-[720px]" src={DashboardImg} alt="" />
      </div>

      <div className="mx-auto flex w-full !min-w-[400px] max-w-[480px] flex-col px-[16px] py-[120px] lg:px-[64px] lg:py-[80px]">
        <LoginStateProvider>
          <LoginForm />
          <MobileForm />
          <QrCodeFrom />
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className="absolute right-0 top-0">
        <LocalePicker />
      </div>
    </main>
  );
}
export default Login;
