import { RouterProvider } from 'react-router-dom';

import router from '@/router';

import ThemeProvider from '@/theme';
import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  return (
    <ThemeProvider>
      <MotionLazy>
        <RouterProvider router={router} />
      </MotionLazy>
    </ThemeProvider>
  );
}

export default App;
