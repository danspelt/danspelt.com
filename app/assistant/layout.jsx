'use client';

import { Provider } from "react-redux";
import store from "../redux/store";

export default function AssistantLayout({children}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-gray-200">
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
