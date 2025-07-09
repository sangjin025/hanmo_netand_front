// src/App.tsx
import React from "react";
import Page from "./app/signup/page"; // ✅ Page.tsx 임포트

import "@fontsource/inter";
import "@fontsource/inter/300.css";
import "@fontsource/inter/700.css";

function App() {
  return <Page />; // ✅ 여기서 Page 컴포넌트를 렌더링
}

export default App;
