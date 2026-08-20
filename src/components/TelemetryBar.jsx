import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const TelemetryBar = () => {
  const { telemetryLogs, chaosMode } = useCart();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`telemetry-bar ${collapsed ? 'collapsed' : ''}`}
      data-testid="telemetry-log"
    >
      <div className="telemetry-header">
        <div className="telemetry-title">
          <span className="live-dot"></span>
          <span>Kane Agent Telemetry & DOM Inspector</span>
          <span className="mode-badge" data-testid="targetability-badge">
            {chaosMode ? '⚠️ DOM Mutated (Chaos Active)' : '✅ Selectors 100% Targetable'}
          </span>
        </div>
        <button
          className="telemetry-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '▲ Expand Log' : '▼ Collapse Log'}
        </button>
      </div>

      {!collapsed && (
        <div className="telemetry-body">
          {telemetryLogs.map((log) => (
            <div key={log.id} className={`log-line log-${log.type.toLowerCase()}`}>
              <span className="log-time">[{log.time}]</span>
              <span className="log-type">[{log.type}]</span>
              <span className="log-text">{log.text}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
