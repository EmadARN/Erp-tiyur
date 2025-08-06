import { closeSettingsDrawer } from "../../../store/slice/settingsSlice";
import { SettingsDrawer } from "./SettingsDrawer";
import {
  useAppDispatch,
  useAppSelector,
} from "@/modules/shared/hooks/useAppDispatch";

type Props = {
  dashboardRef: React.RefObject<HTMLDivElement | null>;
};

const SettingsDrawerWrapper = ({ dashboardRef }: Props) => {
  const isOpen = useAppSelector(
    (state) => state.uiSetting.isSettingsDrawerOpen
  );
  const dispatch = useAppDispatch();

  return (
    <SettingsDrawer
      open={isOpen}
      onClose={() => dispatch(closeSettingsDrawer())}
      dashboardRef={dashboardRef}
    />
  );
};

export default SettingsDrawerWrapper;
