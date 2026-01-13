import React, { useEffect } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ATSCleanTemplate from "./templates/ATSCleanTemplate";
import ModernTwoColumnTemplate from "./templates/ModernTwoColumnTemplate";
import ElegantSidebarTemplate from "./templates/ElegantSidebarTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  useEffect(() => {
    // Add print styles dynamically when component mounts
    const styleId = 'resume-print-styles';
    
    // Remove existing style if present
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        html, body {
          width: 210mm !important;
          height: 297mm !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
          background: white !important;
        }
        
        body * {
          visibility: hidden !important;
        }
        
        #resume-preview,
        #resume-preview * {
          visibility: visible !important;
        }
        
        #resume-preview {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
          background: white !important;
        }
        
        button, nav, .no-print, header:not(#resume-preview header), footer:not(#resume-preview footer) {
          display: none !important;
          visibility: hidden !important;
        }
        
        img {
          max-width: 100% !important;
          page-break-inside: avoid !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
        }
        
        p, li {
          orphans: 3;
          widows: 3;
        }
      }
    `;
    
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, []);

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} />;
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "ats-clean":
        return <ATSCleanTemplate data={data} accentColor={accentColor} />;
      case "modern-two-column":
        return <ModernTwoColumnTemplate data={data} accentColor={accentColor} />;
      case "elegant-sidebar":
        return <ElegantSidebarTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        className={`border border-gray-200 bg-white ${classes}`}
        id="resume-preview"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;