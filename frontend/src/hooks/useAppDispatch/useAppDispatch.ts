import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';

// A custom hook to use the AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();
