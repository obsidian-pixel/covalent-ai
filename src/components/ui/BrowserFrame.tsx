import React from 'react';

interface BrowserFrameProps {
  children: React.ReactNode;
  title?: string; // Optional title to display in the browser bar
}

const BrowserFrame = ({ children, title = "example.com" }: BrowserFrameProps) => {
  return (
    <div className="border border-graphite/50 rounded-lg shadow-2xl overflow-hidden bg-carbon flex flex-col h-full">
      {/* Browser top bar */}
      <div className="flex items-center h-10 px-4 bg-graphite border-b border-graphite/50 flex-shrink-0">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        {/* Optional: Address bar style (simplified) */}
        <div className="bg-carbon rounded-md px-3 py-1 text-xs text-gray-400 flex-grow truncate">
          {title}
        </div>
      </div>
      {/* Content area */}
      <div className="flex-grow overflow-auto bg-black"> {/* Ensure video content can take up space */}
        {children}
      </div>
    </div>
  );
};

export default BrowserFrame;
