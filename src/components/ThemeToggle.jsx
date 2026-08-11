import { useCallback } from "react";
import { motion } from "framer-motion";

export const createAnimation = (
  variant = "circle",
  start = "center"
) => {
  const getClipPathPosition = (position) => {
    switch (position) {
      case "top-left": return "0% 0%";
      case "top-right": return "100% 0%";
      case "bottom-left": return "0% 100%";
      case "bottom-right": return "100% 100%";
      case "top-center": return "50% 0%";
      case "bottom-center": return "50% 100%";
      default: return "50% 50%";
    }
  };

  const clipPosition = getClipPathPosition(start);

  return {
    name: `theme-${start}`,
    css: `
      ::view-transition-group(root) {
        animation-duration: 2.4s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-theme-${start};
      }

      ::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }

      @keyframes reveal-theme-${start} {
        from {
          clip-path: circle(0% at ${clipPosition});
        }
        to {
          clip-path: circle(180% at ${clipPosition});
        }
      }
    `
  };
};

export const ThemeToggleButton = ({
  isDark = true,
  onToggle,
  className = "",
  variant = "circle",
  start = "bottom-left"
}) => {
  const styleId = "theme-transition-styles";

  const updateStyles = useCallback((css) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const handleToggle = () => {
    const nextDark = !isDark;
    const animation = createAnimation(variant, start);
    updateStyles(animation.css);

    const switchTheme = () => {
      if (nextDark) {
        document.body.classList.remove("light-theme");
      } else {
        document.body.classList.add("light-theme");
      }
      if (onToggle) onToggle(nextDark);
    };

    if (document.startViewTransition) {
      document.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={handleToggle}
      aria-label="Toggle dark/light theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="theme-svg-icon">
        <motion.g
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.8 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill={isDark ? "#D4B06A" : "#142B52"}
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill={isDark ? "#0A1026" : "#ffffff"}
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 0 : -180 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.8 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill={isDark ? "#F8F6EE" : "#D4B06A"}
        />
      </svg>
    </button>
  );
};

export default ThemeToggleButton;
