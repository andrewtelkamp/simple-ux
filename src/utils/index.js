export const wait = time => (
  new Promise(res => {
    setTimeout(() => res(), time)
  })
)

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
