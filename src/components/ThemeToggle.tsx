import { Sun, Moon } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "../hooks/useTheme"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      className="rounded-full border border-gray-300 bg-white p-2 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800"
      aria-label="Alternar tema"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-indigo-600" />
        )}
      </motion.div>
    </motion.button>
  )
}
