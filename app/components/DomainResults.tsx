type Props = {
    data: {
      domain: string;
      spf: string | null;
      dkim: boolean;
      dmarc: string | null;
    };
  };
  
  function badgeStyle(pass: boolean): React.CSSProperties {
    return {
      fontSize: 12,
      fontWeight: 600,
      padding: "4px 10px",
      borderRadius: 999,
      background: pass ? "#dcfce7" : "#fef3c7",
      color: pass ? "#166534" : "#92400e",
    };
  }
  
  export default function DomainResults({ data }: Props) {
    return (
      <div style={{ marginTop: 24, maxWidth: 600 }}>
        {/* SPF */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>SPF</strong>
            <span style={badgeStyle(!!data.spf)}>
              {data.spf ? "PASS" : "WARNING"}
            </span>
          </div>
  
          <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>
            {data.spf || "No SPF record found"}
          </div>
        </div>
  
        {/* DKIM */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>DKIM</strong>
            <span style={badgeStyle(data.dkim)}>
              {data.dkim ? "PASS" : "WARNING"}
            </span>
          </div>
  
          <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>
            {data.dkim ? "DKIM detected" : "No DKIM detected"}
          </div>
        </div>
  
        {/* DMARC */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>DMARC</strong>
            <span style={badgeStyle(!!data.dmarc)}>
              {data.dmarc ? "PASS" : "WARNING"}
            </span>
          </div>
  
          <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>
            {data.dmarc || "No DMARC record found"}
          </div>
        </div>
      </div>
    );
  }