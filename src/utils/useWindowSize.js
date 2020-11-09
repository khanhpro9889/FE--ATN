// import { useEffect, useState } from 'react'

// export function useWindowSize() {
//   const isClient = typeof window === 'object'

//   function getSize() {
//     return {
//       width: isClient ? document.documentElement.clientWidth : undefined,
//       height: isClient ? document.documentElement.clientHeight : undefined
//     }
//   }

//   const [windowSize, setWindowSize] = useState(getSize)

//   useEffect(() => {
//     if (!isClient) {
//       return false
//     }

//     function handleResize() {
//       setWindowSize(getSize())
//     }

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []) // Empty array ensures that effect is only run on mount and unmount

//   return windowSize
// }
