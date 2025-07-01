// #TODO Style component as per App design and adapt well to smaller/bigger screens screens.
import Button from '@/shared/components/UI/Button';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 h-[60vh]">
      <div className="w-full max-w-[460px] bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-red-tenn mb-4">
          Щось пішло не так
        </h2>

        <p className="text-gray-700 mb-4">
          Сталася помилка при завантаженні сторінки. Будь ласка, спробуйте ще
          раз.
        </p>

        <details className="mb-6">
          <summary className="cursor-pointer text-sm text-gray-500 mb-2">
            Технічні деталі
          </summary>
          <div className="p-3 bg-gray-100 rounded text-xs font-mono overflow-auto">
            {error.message}
          </div>
        </details>

        <div className="flex gap-2 justify-between">
          <Button
            type="button"
            label="Спробувати знову"
            onClick={resetErrorBoundary}
          />
          <Button
            type="button"
            label="На головну"
            onClick={() => navigate('/')}
            className="btn-google-disabled hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
