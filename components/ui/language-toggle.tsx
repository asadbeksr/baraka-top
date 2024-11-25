import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  value: "uz" | "ru";
  onChange: (value: "uz" | "ru") => void;
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange("uz")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
          value === "uz" && "bg-accent"
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 640 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#1eb53a" d="M0 320h640v160H0z"/>
          <path fill="#0099b5" d="M0 0h640v160H0z"/>
          <path fill="#ce1126" d="M0 153.6h640v172.8H0z"/>
          <path fill="#fff" d="M0 163.2h640v153.6H0z"/>
          <circle cx="134.4" cy="76.8" r="57.6" fill="#fff"/>
          <circle cx="153.6" cy="76.8" r="57.6" fill="#0099b5"/>
          <g fill="#fff" transform="matrix(1.92 0 0 1.92 261.1 122.9)">
            <g id="e">
              <g id="d">
                <g id="c">
                  <g id="b">
                    <path id="a" d="M0-6L-1.9-.3 1 .7"/>
                    <use transform="scale(-1 1)"/>
                  </g>
                  <use transform="rotate(72)"/>
                </g>
                <use transform="rotate(-72)"/>
                <use transform="rotate(144)"/>
              </g>
              <use transform="rotate(144)"/>
            </g>
            <use transform="rotate(-144)"/>
          </g>
        </svg>
        <span>O&apos;zbekcha</span>
      </button>

      <button
        onClick={() => onChange("ru")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
          value === "ru" && "bg-accent"
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 640 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z"/>
            <path fill="#0039a6" d="M0 160h640v320H0z"/>
            <path fill="#d52b1e" d="M0 320h640v160H0z"/>
          </g>
        </svg>
        <span>Русский</span>
      </button>
    </div>
  );
}
