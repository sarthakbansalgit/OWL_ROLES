import React, { useState } from 'react';

// Tabs component
export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      <div className="tabs-list">
        {React.Children.map(children, child =>
          child.type === TabsTrigger
            ? React.cloneElement(child, {
                isActive: child.props.value === activeTab,
                onClick: () => setActiveTab(child.props.value),
              })
            : child
        )}
      </div>
      <div className="tabs-content">
        {React.Children.map(children, child =>
          child.type === TabsContent && child.props.value === activeTab
            ? child
            : null
        )}
      </div>
    </div>
  );
};

// TabsTrigger component
export const TabsTrigger = ({ value, isActive, onClick, children }) => (
  <button
    className={`tab-trigger ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// TabsContent component
export const TabsContent = ({ value, children }) => <div>{children}</div>;

// TabsList component (added this to make it work with TabsTrigger)
export const TabsList = ({ children }) => <div className="tabs-list">{children}</div>;
