export { Toast } from './Toast';

export const showToast = ({ message }) => {
  <Toast
    message={ message }
    visibleDuration={ 3000 }
    bottomOffset={ 100 }
  />
}