import { useDispatch } from "react-redux";
import type { AppDisptach } from ".";
export const useAppDispatch = () => useDispatch<AppDisptach>();