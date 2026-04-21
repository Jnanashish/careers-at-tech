import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px", textAlign: "center" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Something went wrong</h2>
                    <p style={{ color: "#666", marginBottom: "20px" }}>Please try refreshing the page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ padding: "10px 24px", backgroundColor: "#0050ff", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
