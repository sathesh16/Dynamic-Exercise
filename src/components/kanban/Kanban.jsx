import React, { useState } from 'react'

function Kanban() {
    const [columns, setColumns] = useState([
        {
            id: "low",
            title: "low",
            cards: [
                { id: "1", title: "Learn React" },
                { id: "2", title: "Build Kanban Board" },
            ],
        },
        {
            id: "medium",
            title: "medium",
            cards: [{ id: "3", title: "Write Documentation" }],
        },
        {
            id: "high",
            title: "high",
            cards: [{ id: "4", title: "Setup Project" }],
        },
    ]);
    const handleDragStart = (e, cardId, fromColumnId) => {   //storing column and card(id)
        e.dataTransfer.setData("cardId", cardId);
        e.dataTransfer.setData("fromColumnId", fromColumnId);
    };

    const handleDrop = (e, toColumnId) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const fromColumnId = e.dataTransfer.getData("fromColumnId"); //get data

        if (!cardId || !fromColumnId) return;

        setColumns((prevColumns) => {
            const newColumns = prevColumns.map((col) => {
                // remove card from source column (new columns)
                if (col.id === fromColumnId) {
                    return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
                }
                return col;
            });

            // find the moved card - storing moved card from prevColumn
            const movedCard = prevColumns
                .find((col) => col.id === fromColumnId)
                .cards.find((c) => c.id === cardId);

            // add card to target column
            return newColumns.map((col) => {
                if (col.id === toColumnId) {
                    return { ...col, cards: [...col.cards, movedCard] };
                }
                return col;
            });
        });
    };

    const handleDragOver = (e) => e.preventDefault(); //just avoiding default action

    return (
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3,1fr)", maxWidth: "800px", justifyContent: "center" }}>
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="column"
                    onDrop={(e) => handleDrop(e, column.id)}
                    onDragOver={handleDragOver}
                >
                    <h2>{column.title}</h2>
                    {column.cards.map((card) => (
                        <div
                            key={card.id}
                            className="card"
                            style={{ background: "grey", margin: "10px" }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                        >
                            {card.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Kanban
