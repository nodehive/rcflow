"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/lib/store";
import { useTheme } from "next-themes";
import {
  MousePointer,
  Square,
  Circle,
  Type,
  Undo,
  Redo,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowUpDown,
  ArrowLeftRight,
} from "lucide-react";
import { useReactFlow } from "reactflow";

export function Toolbar() {
  const { 
    currentTool, 
    setCurrentTool, 
    currentLayout, 
    setCurrentLayout, 
    undo, 
    redo, 
    history, 
    historyIndex 
  } = useAppStore();
  const { theme, setTheme } = useTheme();
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'label', icon: Type, label: 'Label' },
  ] as const;

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-2 bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg">
        {/* Tool Selection */}
        <div className="flex items-center gap-1">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={currentTool === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentTool(tool.id as any)}
              className="h-8 w-8 p-0"
              title={tool.label}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            className="h-8 w-8 p-0"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            className="h-8 w-8 p-0"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => zoomOut()}
            className="h-8 w-8 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => zoomIn()}
            className="h-8 w-8 p-0"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fitView()}
            className="h-8 w-8 p-0"
            title="Fit View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Layout Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant={currentLayout === 'horizontal' ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentLayout('horizontal')}
            className="h-8 w-8 p-0"
            title="Horizontal Layout"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          <Button
            variant={currentLayout === 'vertical' ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentLayout('vertical')}
            className="h-8 w-8 p-0"
            title="Vertical Layout"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 p-0"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}