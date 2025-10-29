import React, { useEffect, useRef, useState } from 'react'

function WebSocketChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const ws = useRef(null);

    useEffect(() => {
        // Connect to WebSocket server
        ws.current = new WebSocket("ws://localhost:8080");

        ws.current.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.current.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        // Cleanup connection on unmount
        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws.current && input.trim() !== "") {
            ws.current.send(input);
            setInput("");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "center" }}>
            <h2>💬 WebSocket Chat</h2>
            <div
                style={{
                    border: "1px solid #ccc",
                    height: "300px",
                    overflowY: "auto",
                    padding: "10px",
                    marginBottom: "10px",
                }}
            >
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: "left", margin: "5px 0" }}>
                        {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ padding: "8px", width: "70%" }}
            />
            <button
                onClick={sendMessage}
                style={{ padding: "8px 12px", marginLeft: "10px" }}
            >
                Send
            </button>
        </div>
    );
}

export default WebSocketChat
