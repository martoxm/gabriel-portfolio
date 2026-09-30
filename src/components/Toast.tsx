import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"
import { toastStore } from "../lib/store"

export function Toast() {
  const toast = toastStore.use()

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border border-line-strong bg-surface/90 px-4 py-2 text-sm text-fg shadow-2xl backdrop-blur-xl"
          >
            <Check size={16} className="text-ok" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
