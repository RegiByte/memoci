import { cloneElement, useEffect, useState } from "react"
import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from "@floating-ui/react-dom-interactions"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  label: JSX.Element
  placement?: Placement
  children: JSX.Element
}

export const AnimatedTooltip = ({
  children,
  label,
  placement = "top"
}: Props) => {
  const [open, setOpen] = useState(false)

  const { x, y, reference, floating, strategy, context, refs, update } =
    useFloating({
      placement,
      open,
      onOpenChange: setOpen,
      middleware: [offset(5), flip(), shift({ padding: 8 })]
    })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: { open: 1000 },
      restMs: 40
    }),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context)
  ])

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update)
    }
  }, [refs.reference, refs.floating, update, open])

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? "",
                left: x ?? ""
              }
            })}
          >
            <div className="bg-white border-4 border-sky-400 text-[#32292F] text-2xl p-2 rounded-lg">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
