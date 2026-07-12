import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "../hooks/useTheme"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      className="p-2 rounded-full border border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-gray-800 shadow-sm transition-colors"
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
