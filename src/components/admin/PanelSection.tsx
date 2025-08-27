import type { JSX } from "react";

type PanelItem = {
  href: string;
  label: string;
  icon: JSX.Element;
  colorBg: string;
  colorText: string;
  gradient: string;
};

type PanelSection = {
  id: string;
  title: string;
  items: PanelItem[];
};

export default function PanelSectionComponent({
  section,
}: {
  section: PanelSection;
}) {
  return (
    <div className="mb-4">
      <div className="mb-3">
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 text-sm font-bold mb-2">
          {section.title}
        </h3>
        <div className="h-px bg-slate-300"></div>
      </div>

      <div className="space-y-2">
        {section.items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group relative overflow-hidden bg-white border border-slate-200/60 rounded-xl p-3 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/80 flex items-center"
          >
            {/* Gradient overlay on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex items-center space-x-3 w-full">
              {/* Icon container */}
              <div
                className={`${item.colorBg} p-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${item.colorText}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {item.icon}
                </svg>
              </div>

              {/* Text */}
              <span className="text-gray-700 font-medium text-sm group-hover:text-slate-800 transition-colors flex-1">
                {item.label}
              </span>

              {/* Arrow */}
              <div className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.colorBg.replace(
                "bg-gradient-to-br",
                ""
              )} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></div>
          </a>
        ))}
      </div>
    </div>
  );
}
