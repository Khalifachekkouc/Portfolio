<h1>Portfolio</h1>

🗂️ Interactive Virtual Desk (Draggable Cards)

A creative and highly interactive Portfolio UI Component that simulates a physical desk with scattered draggable notes. This project showcases advanced DOM manipulation, coordinate geometry, and smooth user experience (UX) design.

🚀 Key Features

Physics-based Drag & Drop: Users can freely grab and move cards around the "desk" area.

Smart Z-Indexing: Every time a card is clicked or dragged, it automatically rises to the top layer (highestZ), mimicking real-life behavior.

Auto-Scatter Algorithm: On page load or window resize, cards are randomly distributed and rotated within the desk boundaries for a natural "messy desk" look.

Scroll Spy Integration: The navigation menu syncs with the page sections; as you scroll, the corresponding menu card highlights automatically.

Responsive Layout: Designed to handle card scattering and interactions across different screen sizes, including a mobile-detection logic.

🛠️ Technical Deep Dive

Coordinate Mapping: Calculates the precise mouse offset (clientX - rect.left) to ensure the card stays exactly under the cursor during the drag.

Dynamic Content Injection: Card data (Category, Title, Description) is pulled from HTML attributes and rendered dynamically via JavaScript.

Event Lifecycle: Manages a complex lifecycle of mousedown, mousemove, and mouseup (plus touch events) to ensure zero lag.
