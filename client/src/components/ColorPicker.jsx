import { Check, Palette } from "lucide-react";
import React, { useState } from "react";
import { colors } from "../data/componentsData";
import { ScrollArea } from "@ui/scroll-area"; // ✅ ensure this import is correct

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-[#cb39fc] bg-gradient-to-br from-[#d07cec]-50 to-[#efb9ff] ring-[#ebb0ff] hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Color Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10 w-60 rounded-md border border-gray-200 bg-white shadow-sm">
          <ScrollArea className="h-60 p-3 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className="relative cursor-pointer group flex flex-col"
                  onClick={() => {
                    onChange(color.value);
                    setIsOpen(false);
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                    style={{ backgroundColor: color.value }}
                  ></div>

                  {selectedColor === color.value && (
                    <div className="absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center">
                      <Check className="size-5 text-white" />
                    </div>
                  )}

                  <p className="text-xs text-center mt-1 text-gray-600">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
