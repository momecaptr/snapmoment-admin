import type { RootState } from '@/myApp/store/store';

import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
