// src/App.tsx
import React from "react";
import SignUpPage from "./app/signup/page";

import "@fontsource/inter";
import "@fontsource/inter/300.css";
import "@fontsource/inter/700.css";

function App() {
  return <SignUpPage />; // ✅ 여기서 Page 컴포넌트를 렌더링
}

export default App;
