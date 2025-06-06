// # 📂 hooks

// У цій папці зберігаються всі кастомні React-хуки для проєкту PET HELP.

// - `useAppDispatch` — типізований dispatch з Redux
// - `useAppSelector` — типізований selector з Redux
// - `useClickOutside` — хук для кліку поза елементом (закриття модалок тощо)
// - `useModal`, `useToggle`, `useScrollLock` — для управління UI-станом

// > Дотримуйтесь іменування: useНазва (CamelCase)
// src/hooks/reduxHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
