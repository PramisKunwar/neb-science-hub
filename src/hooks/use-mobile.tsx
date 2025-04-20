
import * as React from "react"

// Use a more precise breakpoint system
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isAbove, setIsAbove] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
    const onChange = () => {
      setIsAbove(mql.matches)
    }

    mql.addEventListener("change", onChange)
    onChange() // Initial check
    
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return isAbove
}

export function useIsMobile() {
  const isAboveMd = useBreakpoint("md")
  return isAboveMd === false // Returns undefined during SSR
}

export function useIsTablet() {
  const isAboveLg = useBreakpoint("lg")
  const isAboveMd = useBreakpoint("md")
  return isAboveMd && !isAboveLg
}

export function useIsDesktop() {
  const isAboveLg = useBreakpoint("lg")
  return isAboveLg
}
