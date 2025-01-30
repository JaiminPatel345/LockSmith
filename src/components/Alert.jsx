import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dialog, Toast} from 'react-native-alert-notification';
import {clearAlert} from '../store/slices/alertSlice';

const Alert = () => {
  const alertMessage = useSelector(state => state.alert.message);
  const alertType = useSelector(state => state.alert.type);
  const alertTitle = useSelector(state => state.alert.title);
  const isDialog = useSelector(state => state.alert.isDialog);
  const dispatch = useDispatch();

  // Track if alert is currently showing
  const isShowingRef = useRef(false);

  useEffect(() => {
    // Only show new alerts when we have all required properties and no alert is currently showing
    if (alertTitle && alertType && !isShowingRef.current) {
      isShowingRef.current = true;

      if (isDialog) {
        Toast.show({
          type: alertType,
          title: alertTitle,
          textBody: alertMessage,
          button: 'Close',
          onPressButton: () => {
            Toast.hide();
            isShowingRef.current = false;
            dispatch(clearAlert());
          },
          onHide: () => {
            // Handle cases where dialog is dismissed without button press
            isShowingRef.current = false;
            dispatch(clearAlert());
          },
        });
      } else {
        Dialog.show({
          type: alertType,
          title: alertTitle,
          textBody: alertMessage,
          button: 'Close',
          onPressButton: () => {
            Dialog.hide();
            isShowingRef.current = false;
            dispatch(clearAlert());
          },
          onHide: () => {
            // Handle cases where dialog is dismissed without button press
            isShowingRef.current = false;
            dispatch(clearAlert());
          },
        });
      }
    }

    // Cleanup function to ensure we hide dialog and reset state when component unmounts
    return () => {
      if (isShowingRef.current) {
        Dialog.hide();
        isShowingRef.current = false;
      }
    };
  }, [alertTitle, alertType, alertMessage, dispatch]);

  return null;
};

export default Alert;
