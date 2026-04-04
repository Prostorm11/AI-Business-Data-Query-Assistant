import { Activity, Settings, Bell } from "lucide-react"

interface HeaderProps {
  isConnected: boolean
}

export function Header({ isConnected }: HeaderProps) {
  return (
    <header style={{
      background: "rgba(10, 14, 26, 0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        height: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px rgba(59,130,246,0.4)",
          }}>
            <Activity size={16} color="#fff" />
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}>
            QueryAI
          </span>
          <span style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--text-muted)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            padding: "2px 8px",
            borderRadius: "100px",
          }}>
            beta
          </span>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Status indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "var(--bg-surface)",
            border: `1px solid ${isConnected ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
            borderRadius: "100px",
            padding: "4px 10px",
            fontSize: "12px",
            color: isConnected ? "var(--success)" : "var(--danger)",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isConnected ? "var(--success)" : "var(--danger)",
              boxShadow: isConnected ? "0 0 6px var(--success)" : "0 0 6px var(--danger)",
            }} />
            {isConnected ? "Connected" : "Offline"}
          </div>

          <button style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--bg-surface)",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)" }}
          >
            <Bell size={15} />
          </button>

          <button style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--bg-surface)",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)" }}
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </header>
  )
}
