import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/Theme";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button onClick={handleToggleTheme} variant="ghost" size="icon">
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
