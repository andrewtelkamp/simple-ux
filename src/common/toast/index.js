export { Toast } from './Toast';

export const showToast = ({ message }) => {
  <Toast
    message='Hey! I am a toast!'
    visibleDuration={ 3000 }
    bottomOffset={ 100 }
  />
}